#!/usr/bin/env python3
"""Return all students sorted by average score."""


def top_students(mongo_collection):
    """Return students sorted by their average topic score."""
    pipeline = [
        {
            "$addFields": {
                "averageScore": {
                    "$avg": "$topics.score"
                }
            }
        },
        {
            "$sort": {
                "averageScore": -1
            }
        }
    ]

    return list(mongo_collection.aggregate(pipeline))
