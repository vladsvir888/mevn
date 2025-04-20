interface PaginationData {
  count: number;
  limit: number;
  reqPage: number;
}

class HelperBoxService {
  public paginationData({ count, limit, reqPage }: PaginationData) {
    let page = reqPage ?? 1;
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
  }

  public daysToMilliseconds(days: number) {
    return days * 24 * 60 * 60 * 1000;
  }
}

const helperBoxService = new HelperBoxService();

export default helperBoxService;
