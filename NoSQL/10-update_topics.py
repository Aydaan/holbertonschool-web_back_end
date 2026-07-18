#!/usr/bin/env python3
"""Update topics of school documents."""


def update_topics(mongo_collection, name, topics):
    """Update the topics of all documents with the given name."""
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
