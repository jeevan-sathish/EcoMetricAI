import re

def validate_query(query: str):
    query = query.strip().rstrip(";")

    if not re.match(r"^SELECT\b", query, re.IGNORECASE):
        raise ValueError("Only SELECT queries are allowed.")

    blocked_keywords = [
        "INSERT", "UPDATE", "DELETE", "DROP", "ALTER",
        "TRUNCATE", "CREATE", "REPLACE", "MERGE",
        "GRANT", "REVOKE", "EXEC", "EXECUTE",
        "CALL", "COPY", "VACUUM", "ANALYZE"
    ]

    upper_query = query.upper()

    for keyword in blocked_keywords:
        if re.search(rf"\b{keyword}\b", upper_query):
            raise ValueError(f"Forbidden SQL keyword detected: {keyword}")

    
    if not re.search(r"\bFROM\s+cars\b", query, re.IGNORECASE):
        raise ValueError("Only the cars table may be queried.")
    
    if "--" in query or "/*" in query or "*/" in query:
        raise ValueError("SQL comments are not allowed.")

    return query