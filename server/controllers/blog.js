const Blog = require("../models/Blog");
const slugify = require("slugify");
const AsyncLock = require("async-lock");
const lock = new AsyncLock();

exports.getBlogs = (req, res) => {
  Blog.find({ status: "published" })
    .sort({ createdAt: -1 })
    .exec(function (err, publishedBlogs) {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(publishedBlogs);
    });
};

exports.getUserBlogs = async (req, res) => {
  const userId = req.user.sub;
  let userBlogs = [];
  try {
    userBlogs = await Blog.find({ userId: userId });
  } catch (e) {
    return res.status(422).send(e);
  }
  return res.json(userBlogs);
};

exports.getBlogBySlug = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({ slug }, function (err, foundBlog) {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundBlog);
  });
};

exports.getBlogById = async (req, res) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send(`Blog with ${blogId} does not exist`);
    }
  } catch (e) {
    console.log(e.message);
  }

  return res.json(blog);
};

exports.getUserBlogs = (req, res) => {
  const userId = req.user.sub;

  Blog.find({ userId }, function (err, userBlogs) {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(userBlogs);
  });
};

exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;
  let foundBlog;
  try {
    foundBlog = await Blog.findById(blogId);
    if (blogData.status && blogData.status === "published" && !foundBlog.slug) {
      const slugOptions = { replacement: "-", remove: null, lower: true };
      foundBlog.slug = slugify(foundBlog.title, slugOptions);
    }
    foundBlog.set(blogData);
    foundBlog.updatedAt = new Date();
    foundBlog.save();
    return res.status(200).send(foundBlog);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  // if (blogData.status && blogData.status === "published" && !foundBlog.slug) {
  //   foundBlog.slug = slugify(foundBlog.title, {
  //     replacement: "-", // replace spaces with replacement
  //     remove: null, // regex to remove characters
  //     lower: true, // result in lower case
  //   });
  // }

  // foundBlog.set(blogData);
  // foundBlog.updatedAt = new Date();
  // foundBlog.save(function (err, foundBlog) {
  //   if (err) {
  //     return res.status(422).send(err);
  //   }

  //   return res.json(foundBlog);
  // });
  // });
};

//------------
exports.createBlog = (req, res) => {
  //key comes from client
  //because if other user send the request I dont wanna lock the request for other one
  //we send the key with the save button in the controller menu
  const lockId = req.query.lockId;
  let blog;

  if (!lock.isBusy(lockId)) {
    lock
      .acquire(lockId, async () => {
        const blogData = req.body;
        blog = await new Blog(blogData);
        if (req.user) {
          blog.userId = req.user.sub;
          blog.author = req.user.name;
        }
        await blog.save();
      })
      .then(() =>
        res.status(200).json({ message: "Blog is saved!", blog: blog })
      )
      .catch((e) => res.status(422).json({ message: e.message }));
  } else {
    return res.status(422).json({ message: "Blog is saving" });
  }

  // let blog;
  // try {
  //   const blogData = req.body;
  //   blog = await new Blog(blogData);
  //   if (req.user) {
  //     blog.userId = req.user.sub;
  //     blog.author = req.user.name;
  //   }
  //   await blog.save();
  //   return res.status(200).json({ message: "Blog is saved!", blog: blog });
  // } catch (e) {
  //   return res.status(422).json({ message: e.message });
  // }
};

// exports.deleteBlog = async (req, res) => {
//   const blogId = req.params.id;

//   try {
//     await Blog.deleteOne({ _id: blogId });
//     return res.json({ status: "deleted" });
//   } catch (e) {
//     return res.status(422).send(e.message);
//   }
// };

// -----DELETEONE TAKES CALLBACK----------------
// exports.deleteBlog = (req, res) => {
//   const blogId = req.params.id;

//   Blog.deleteOne({ _id: blogId }, function (err, done) {
//     if (err) {
//       return res.status(422).send(err);
//     }
//   });
//   res.json({ status: "deleted" });
// };

exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  await Blog.findByIdAndDelete(blogId).then(() =>
    res
      .json({ status: "deleted" })
      .catch((e) => console.log("error in blogsssssssss", e.message))
  );
};
