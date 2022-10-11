interface FiltersObj {
  query: {
    bool: {
      must?: Record<string, any>
      should?: Record<string, any>
    }
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
    provide,
    rating,
    scale,
    search,
    size,
    tags,
    title,
    type,
    views,
    operator,
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

  if (operator === "AND") {
    filters.query.bool.must = []
  } else {
    filters.query.bool.should = []
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
