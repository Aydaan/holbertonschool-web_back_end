def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
    """
    Return hypermedia pagination information.
    """
    data = self.get_page(page, page_size)
    total_pages = math.ceil(len(self.dataset()) / page_size)

    prev_page = page - 1 if page > 1 else None
    next_page = page + 1 if page < total_pages else None

    return {
        "page_size": len(data),
        "page": page,
        "data": data,
        "next_page": next_page,
        "prev_page": prev_page,
        "total_pages": total_pages,
    }
