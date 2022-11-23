interface FiltersObj {
  query: {
    bool: {
      must?: Record<string, any>
      should?: Record<string, any>
    }
    multi_match?: {
      query: string
      fields: string[]
    }
  }
}

export const createESSimilarSearchQuery = (id: string | number) => {
  return {
    query: {
      more_like_this: {
        fields: ["type", "title", "tags", "description", "genre", "album"],
        like: [
          {
            _index: "assets",
            _id: `${id}`,
          },
        ],
        min_term_freq: 1,
        max_query_terms: 12,
      },
    },
  }
}

export const createESSearchQuery = (data: GetAssetReq) => {
  const {
    bitrate,
    created,
    fname,
    fps,
    id,
    likes,
    mime,
    modified,
    rating,
    scale,
    size,
    tags,
    title,
    type,
    views,
    operator,
    search,
  } = data

  const loopData = {
    title,
    created,
    fname,
    fps,
    id,
    likes,
    mime,
    modified,
    rating,
    scale,
    size,
    tags,
    type,
    bitrate,
    views,
  }

  const filters: FiltersObj = {
    query: {
      bool: {
        must: [],
        should: [],
      },
    },
  }

  if (search && search?.length > 1) {
    filters.query.multi_match = {
      query: search,
      fields: [
        "title^5",
        "description^4",
        "location^4",
        "tags^3",
        "album^2",
        "genre",
        "comment",
      ],
    }
  }

  if (operator === "AND") {
    filters.query.bool.must = []
  } else {
    filters.query.bool.should = []
  }

  if (Object.values(loopData).length === 0) {
    return []
  }

  for (const [key, value] of Object.entries(loopData)) {
    if (value) {
      if (operator === "AND") {
        if (filters.query.bool.must) {
          filters.query.bool.must.push({
            match: {
              [key]: value,
            },
          })
          delete filters.query.bool.should
        }
      } else {
        if (filters.query.bool.should) {
          filters.query.bool.should.push({
            match: {
              [key]: value,
            },
          })
          delete filters.query.bool.must
        }
      }
    }
  }

  return filters
}

export const createESSortQuery = (data: GetAssetReq) => {
  const sort = data?.sort?.keywords.map((sort) => {
    return {
      [sort.fieldName || "rating"]: {
        order: sort.order || "desc",
      },
    }
  })
  return {
    sort,
    from: data?.sort?.from || 0,
    size: data?.sort?.size || 25,
  }
}
