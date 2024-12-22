const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const queryObj = { ...query };
    const searchableFields = ['title'];
  
    let search = '';
    if (query?.search) {
      search = query?.search as string;
    }
  
    if (query?.filter) {
      const authorId = query.filter as string;
      if (Types.ObjectId.isValid(authorId)) {
        queryObj.author = new Types.ObjectId(authorId);
      } else {
        throw new Error('Invalid author ID');
      }
    }
  
    const searchQuery = BlogModel.find({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
  
    const excludeField = ['search', 'sortBy', 'sortOrder', 'filter'];
    excludeField.forEach((el) => delete queryObj[el]);
  
    const filterQuery = searchQuery.find(queryObj);
  
    let sortBy = '-createdAt';
    if (query.sortBy) {
      sortBy = query.sortBy as string;
    }
  
    let sortOrder = -1;
    if (query?.sortOrder && query.sortOrder === 'asc') {
      sortOrder = 1;
    }
    const sortQuery = filterQuery.sort({
      [sortBy]: sortOrder as 1 | -1,
    });
  
    return sortQuery;
  };