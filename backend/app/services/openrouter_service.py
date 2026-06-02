import json
import requests

from app.config import settings


OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


def generate_questions(
    role: str,
    experience: str,
    skills: list
):

    prompt = f"""
Generate exactly 5 technical interview questions.

Role: {role}
Experience: {experience}
Skills: {", ".join(skills)}

Requirements:
- Generate exactly 5 questions
- Focus on the provided skills
- Return one question per line
- No explanations
- No answers
"""

    try:

        response = requests.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": settings.OPENROUTER_MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.7
            },
            timeout=60
        )

        print("Generate Questions Status:", response.status_code)
        print("Generate Questions Response:", response.text)

        if response.status_code != 200:
            return {
                "success": False,
                "error": response.json()
            }

        data = response.json()

        content = (
            data["choices"][0]["message"]["content"]
            if "choices" in data
            else ""
        )

        questions = []

        for line in content.split("\n"):

            line = line.strip()

            if not line:
                continue

            if line[0].isdigit():

                if "." in line:
                    line = line.split(".", 1)[1].strip()

                elif ")" in line:
                    line = line.split(")", 1)[1].strip()

            questions.append(line)

        return {
            "success": True,
            "questions": questions
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }


def evaluate_answer(
    question: str,
    answer: str
):

    prompt = f"""
You are a senior technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON.

Example:

{{
    "score": 8,
    "feedback": "Good answer but add more details."
}}
"""

    try:

        response = requests.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": settings.OPENROUTER_MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.2
            },
            timeout=60
        )

        print("Evaluation Status:", response.status_code)
        print("Evaluation Response:", response.text)

        if response.status_code != 200:
            return {
                "success": False,
                "error": response.json()
            }

        data = response.json()

        content = (
            data["choices"][0]["message"]["content"]
            if "choices" in data
            else ""
        )

        try:

            result = json.loads(content)

            return {
                "success": True,
                "score": result.get("score", 0),
                "feedback": result.get(
                    "feedback",
                    "No feedback generated"
                )
            }

        except Exception:

            return {
                "success": True,
                "score": None,
                "feedback": content
            }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }