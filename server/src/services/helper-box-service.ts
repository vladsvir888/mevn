interface PaginationData {
  count: number;
  limit: number;
  body: {
    page: number;
  };
}

class HelperBoxService {
  public paginationData = ({ count, limit, body }: PaginationData) => {
    let page = body.page ?? 1;
    let skip = 0;
    const pages = Math.ceil(count / limit);

    if (page > pages) {
      page = 1;
    }

    if (page > 1) {
      skip = (page - 1) * limit;
    }

    const first = (page - 1) * count;

    return {
      pages,
      page,
      skip,
      first,
    };
  };
}

const helperBoxService = new HelperBoxService();

export default helperBoxService;
