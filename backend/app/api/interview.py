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
    request: EvaluationRequest
):
    return evaluate_answer(
        request.question,
        request.answer
    )