from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.interview import InterviewRequest

from app.services.openrouter_service import generate_questions

from app.database.session import get_db

from app.utils.dependencies import get_current_user

from app.models.user import User
from app.models.interview_session import InterviewSession

from app.schemas.evaluation import EvaluationRequest
from app.services.openrouter_service import evaluate_answer

from app.models.interview_result import InterviewResult

from sqlalchemy import func
from app.models.interview_result import InterviewResult

router = APIRouter()


@router.post("/generate-interview")
def generate_interview(
    request: InterviewRequest,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    result = generate_questions(
        request.role,
        request.experience,
        request.skills
    )

    if not result["success"]:
        return result

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    session = InterviewSession(
        user_id=user.id,
        role=request.role,
        experience=request.experience,
        questions="\n".join(result["questions"])
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return {
        "success": True,
        "session_id": session.id,
        "questions": result["questions"]
    }

@router.get("/interviews")
def get_interviews(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    sessions = db.query(
        InterviewSession
    ).filter(
        InterviewSession.user_id == user.id
    ).all()

    return [
        {
            "id": session.id,
            "role": session.role,
            "experience": session.experience,
            "created_at": session.created_at
        }
        for session in sessions
    ]

@router.post("/evaluate-answer")
def evaluate_interview_answer(
    request: EvaluationRequest,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    result = evaluate_answer(
        request.question,
        request.answer
    )

    if not result["success"]:
        return result

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    interview_result = InterviewResult(
        user_id=user.id,
        question=request.question,
        answer=request.answer,
        score=result["score"],
        feedback=result["feedback"]
    )

    db.add(interview_result)

    db.commit()

    db.refresh(interview_result)

    return {
        "success": True,
        "result_id": interview_result.id,
        "score": result["score"],
        "feedback": result["feedback"]
    }

@router.get("/results")
def get_results(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    results = db.query(
        InterviewResult
    ).filter(
        InterviewResult.user_id == user.id
    ).all()

    return [
        {
            "id": result.id,
            "question": result.question,
            "answer": result.answer,
            "score": result.score,
            "feedback": result.feedback,
            "created_at": result.created_at
        }
        for result in results
    ]

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    total_interviews = db.query(
        InterviewSession
    ).filter(
        InterviewSession.user_id == user.id
    ).count()

    total_answers = db.query(
        InterviewResult
    ).filter(
        InterviewResult.user_id == user.id
    ).count()

    avg_score = db.query(
        func.avg(InterviewResult.score)
    ).filter(
        InterviewResult.user_id == user.id
    ).scalar()

    max_score = db.query(
        func.max(InterviewResult.score)
    ).filter(
        InterviewResult.user_id == user.id
    ).scalar()

    min_score = db.query(
        func.min(InterviewResult.score)
    ).filter(
        InterviewResult.user_id == user.id
    ).scalar()

    return {
        "total_interviews": total_interviews,
        "total_answers": total_answers,
        "average_score": round(avg_score or 0, 2),
        "highest_score": max_score or 0,
        "lowest_score": min_score or 0
    }

@router.get("/interviews/{session_id}")
def get_interview_details(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):

    user = db.query(User).filter(
        User.email == current_user
    ).first()

    session = db.query(
        InterviewSession
    ).filter(
        InterviewSession.id == session_id,
        InterviewSession.user_id == user.id
    ).first()

    if not session:
        return {
            "success": False,
            "message": "Interview session not found"
        }

    return {
        "id": session.id,
        "role": session.role,
        "experience": session.experience,
        "questions": session.questions.split("\n"),
        "created_at": session.created_at
    }