import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Container, Row, Col } from "reactstrap";
import {
  getUserBlogs,
  updateBlogAction,
  deleteBlogAction,
} from "../actions/blogActions";
import withAuth from "../components/hoc/withAuth";
import { Link, Router } from "../routes";
import PortButtonDropdown from "../components/buttons/Dropdown";
import { confirmAlert } from "react-confirm-alert";

const UserBlogs = (props) => {
  console.log("props in userblogs", props);
  const { myBlogs } = props;

  const separateBlogs = (myBlogs) => {
    const published = [];
    const drafts = [];
    myBlogs.forEach((blog) =>
      blog.status === "published" ? published.push(blog) : drafts.push(blog)
    );
    return { published, drafts };
  };

  const { published, drafts } = separateBlogs(myBlogs);

  const changeBlogStatus = (status, id) => {
    updateBlogAction({ status }, id)
      .then((blog) => Router.pushRoute("/userBlogs"))
      .catch((e) => console.log(e.message));
  };

  const deleteBlogWarning = async (blogId) => {
    const res = confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this blog?</p>
            <button onClick={onClose}>No</button>
            <button
              onClick={() => {
                deleteBlog(blogId);

                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
    if (res) {
      deleteBlog(blogId);
    }
  };

  const dropdownOptions = (blog) => {
    const status = createStatus(blog.status);

    return [
      {
        text: status.view,
        handlers: {
          onClick: () => changeBlogStatus(status.value, blog._id),
        },
      },
      {
        text: "Delete",
        handlers: { onClick: () => deleteBlogWarning(blog._id) },
      },
    ];
  };

  const createStatus = (status) => {
    return status === "draft"
      ? { view: "Publish Story", value: "published" }
      : { view: "Make a Draft", value: "draft" };
  };

  const deleteBlog = async (blogId) => {
    await deleteBlogAction(blogId)
      .then((status) => {
        Router.pushRoute("/userBlogs");
      })
      .catch((err) => console.error("error inside userBlogs", err.message));
  };

  const renderBlogs = (blogs) => (
    <ul className="user-blogs-list">
      {blogs.map((blog) => (
        <li key={blog._id}>
          <Link route={`/blogs/${blog._id}/edit`}>
            <a>{blog.title} </a>
          </Link>
          <PortButtonDropdown items={dropdownOptions(blog)} />
        </li>
      ))}
    </ul>
  );

  return (
    <BaseLayout
      headerType={"default"}
      className="blog-listing-page"
      title="Yilmaz Bingol blogs"
    >
      <div
        className="masthead"
        style={{ backgroundImage: "url('images/home-bg.jpg')" }}
      >
        <div className="overlay"></div>
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Fresh Blogs</h1>
                <span className="subheading">Programming, travelling...</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center ">
            <h1 className="blog-status-title">Published Blogs</h1>
            {renderBlogs(published)}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h1 className="blog-status-title"> Draft Blogs</h1>
            {renderBlogs(drafts)}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

UserBlogs.getInitialProps = async ({ req }) => {
  let blogs = [];
  try {
    blogs = await getUserBlogs(req);
  } catch (err) {
    console.log(err.message);
  }
  return { myBlogs: blogs };
};

export default withAuth("siteOwner")(UserBlogs);
