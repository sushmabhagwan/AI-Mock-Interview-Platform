from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.utils.dependencies import get_current_user

from app.models.user import User
from app.models.interview_session import InterviewSession
from app.models.interview_result import InterviewResult

router = APIRouter()


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

    results = db.query(
        InterviewResult
    ).filter(
        InterviewResult.user_id == user.id
    ).all()

    total_results = len(results)

    average_score = 0

    if total_results > 0:

        average_score = round(
            sum(r.score for r in results)
            / total_results,
            1
        )

    return {
        "total_interviews": total_interviews,
        "total_results": total_results,
        "average_score": average_score
    }