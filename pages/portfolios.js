import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import axios from "axios";
import BasePage from "../components/BasePage";

class Portfolio extends React.Component {
  static async getInitialProps(context) {
    let posts = [];
    // console.log("context", context);
    try {
      posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
    } catch (e) {
      console.log(e);
    }
    return {
      posts: posts.data.splice(0, 10), // will be passed to the page component as props
    };
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li key={post.id}>
          <Link as={`/portfolio/${post.id}`} href={`/portfolio/[id]`}>
            <a> {post.title}</a>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout>
        <BasePage>
          <h1>portfolios</h1>
          <ul> {this.renderPosts(posts)}</ul>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolio;
