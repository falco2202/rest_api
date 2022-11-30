import { v4 as uuidv4 } from "uuid"
import { readListFromJsonFile, writeListToJsonFile } from "../helpers/handle.js";
import { sort, search, pagination } from "../libraries/features.js";
import { configPathFile } from "../helpers/handle.js";

const PATH_USER = "./src/data/users.json"
const PATH_BLOG = "./src/data/blogs.json"

let authors = readListFromJsonFile(PATH_USER)
let blogs = readListFromJsonFile(PATH_BLOG)

const blogService = {
    getAllBlog : (key, sortBy, orderBy, page, limit) => {
        // let listBlog = await readListFromJsonFile(PATH_BLOG)
        let listBlog = blogs.filter(blog => blog.isPublic === true)
        if(key) {
            listBlog = search(listBlog, key)
        }
        if(sortBy) {
            sort(listBlog, "blog", sortBy, orderBy)
        }
        let result = pagination(listBlog, page, limit)
        return result
    },

    getAllBlogFromAuthorId : (authorId, key, sortBy, orderBy, page, limit ) => {
        let findAuthor = authors.find(author => author.id === authorId)
        if(!findAuthor) 
            return "Author not exist!"
        let listBlogFromAuthorId = blogs.filter(blog => blog.authorId === authorId && blog.isPublic === true)
        if(key) 
            listBlogFromAuthorId = search(listBlogFromAuthorId, key)
        if(sortBy)
            sort(listBlogFromAuthorId, "blog", sortBy, orderBy)
        const result = pagination(listBlogFromAuthorId, page, limit)
        return result
    },

    getBlogFromId : (id) => {
        let findBlog = blogs.find(blog => blog.id === id)
        return findBlog
    }, 

    createBlog : (authorId, infoBlog, imagePath, videoPath) => {
        const findAuthor = authors.find(author => author.id === authorId)
        if(!findAuthor) 
            return "Author not exist!"
        let {title, subTitle, content, isPublic} = infoBlog
        isPublic = isPublic == "true" ? true : false
        const newBlog = {
            "id": uuidv4(),
            "authorId": authorId,
            "title": title,
            "subTitle": subTitle,
            "content": content,
            "isPublic": isPublic,
            "createdAt": new Date(),
            "updatedAt": new Date(),
            "countView": 0,
            "image": configPathFile(imagePath),
            "video": configPathFile(videoPath)
        }
        blogs.push(newBlog)
        writeListToJsonFile(PATH_BLOG, blogs)
        return newBlog
    },

    deleteBlog : (id) => {
        const findBlog = blogs.find(blog => blog.id === id)
        console.log(id)
        if(!findBlog)
            return "Blog not found!"
        blogs = blogs.filter(blog => blog.id !== id)
        console.log(blogs)
        writeListToJsonFile(PATH_BLOG, listBlogs)
        return findBlog
    },

    updateBlog : (id, updateInfo, image, video) => {
        const findBlog = blogs.find(blog => blog.id === id) 
        if(!findBlog)
            return "Blog not found!"
        const {title, subTitle, content, isPublic} = updateInfo
        if(title) {
            findBlog.title = title
        }
        if(subTitle) {
            findBlog.subTitle = subTitle
        }
        if(content) {
            findBlog.content = content
        }
        if(isPublic) {
            findBlog.isPublic = isPublic == "true" ? true : false
        }
        if(image) {
            findBlog.image = configPathFile(image)
        }
        if(video) {
            findBlog.video = configPathFile(video)
        }

        findBlog.updatedAt = new Date()
        writeListToJsonFile(PATH_BLOG, blogs)
        return findBlog
    }
}

export default blogService