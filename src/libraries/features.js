export const search = (object, key) => {
    const re = RegExp(`${key}`, "ig")
    let list = object.filter((item) => {
        return re.test(item.title) || re.test(item.subTilte) || re.test(item.content)
    })
    return list
}

export const pagination = (object, page, limit) => {
    const total = object.length
    const totalPage = total % limit > 0 ? Math.floor(total / limit) + 1 : Math.floor(total / limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const result = object.slice(startIndex, endIndex)
    const paginate = {
        paginate : {
            "limit" : limit,
            "total_page" : totalPage,
            "page" : page,
            "total_record": total
        }
    }

    return [result, paginate]
}

export const sort = (object, method, sortBy, orderBy) => {
    // blog: view , created
    // user: age, created

    switch(method) {
        case "user": {
            if(sortBy === "age" && orderBy === "asc") {
                object = object.sort((userA, userB) => {
                    return userA.age - userB.age
                })
            }

            if(sortBy === "date" && orderBy === "asc") {
                object = object.sort((userA, userB) => {
                    return new Date(userA.createdAt) - new Date(userB.createdAt)
                })
            }

            if(sortBy === "age-date" && orderBy === "asc") {
                object = object.sort((userA, userB) => {
                    if (userA.age === userB.age)
                        return new Date(userA.createdAt) - new Date(userB.createdAt)
                    return userA.age > userB.age ? 1 : -1
                })
            }

            if(sortBy === "age" && orderBy === "desc") {
                object = object.sort((userA, userB) => {
                    return userB.age - userA.age
                })
            }

            if(sortBy === "date" && orderBy === "desc") {
                object = object.sort((userA, userB) => {
                    return new Date(userB.createdAt) - new Date(userA.createdAt)
                })
            }

            if(sortBy === "age-date" && orderBy === "desc") {
                object = object.sort((userA, userB) => {
                    if (userA.age === userB.age)
                        return new Date(userB.createdAt) - new Date(userA.createdAt)
                    return userA.age > userB.age ? -1 : 1
                })
            }
        }

        case "blog": {
            if(sortBy === "view" && orderBy === "asc") {
                object = object.sort((userA, userB) => {
                    return userA.countView - userB.countView
                })
            }

            if(sortBy === "date" && orderBy === "asc") {
                object = object.sort((userA, userB) => {
                    return new Date(userA.createdAt) - new Date(userB.createdAt)
                })
            }

            if(sortBy === "view-date" && orderBy === "asc") {
                object = object.sort((userA, userB) => {
                    if (userA.countView === userB.countView)
                        return new Date(userA.createdAt) - new Date(userB.createdAt)
                    return userA.countView > userB.countView ? 1 : -1
                })
            }

            if(sortBy === "view" && orderBy === "desc") {
                object = object.sort((userA, userB) => {
                    return userB.countView - userA.countView
                })
            }

            if(sortBy === "date" && orderBy === "desc") {
                object = object.sort((userA, userB) => {
                    return new Date(userB.createdAt) - new Date(userA.createdAt)
                })
            }

            if(sortBy === "view-date" && orderBy === "desc") {
                object = object.sort((userA, userB) => {
                    if (userA.countView === userB.countView)
                        return new Date(userB.createdAt) - new Date(userA.createdAt)
                    return userA.countView > userB.countView ? -1 : 1
                })
            }
        }
    }
}
