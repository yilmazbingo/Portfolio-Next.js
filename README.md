# Portfolio-Next.js

### Page directory in Next.js
- When a file is added to the pages directory it's automatically available as a route. Next.js parses the incaming request with "url" package, then reads the page directory with "fs" module. It then check if any url mathces with any page name, it renders that page.  

### Styling
   We have 3 options. Inline styling which uses React conventions, styled jsx and or scss.
- In order to do use scss we have to install loaders, so next.js will know what to do when it sees .scss files.
create next.config.js in the root of the app and place this:

        const withSass=require("@zeit/next-sass")
        module.exports=withSass()

### Get Initial Props
- In server-side-rendering, server sends a populated page to the client upon request. But before sending the html, it has to make sure that, all the async operations are completed and then it will send the html. Next.js uses "react-loadable" package to detect if there is any async operation has to be done before sending the component. If there is, server will wait till that opetation is completed and then it will render the component.

Other wise client had to make 2 requests. In first request we would send the file with ready information, and inside the component's getDerivedStateFromProps lifecycle method we would start the async operation, most likely fetching data, so our client had to make another request to the server. We have to render our app twice. Rendering our react app on the server is extremely computationally intensive. Also we had to write extra alot of code. 

So in getInitialProps, after next.9.3 it is recommended to use 'getStaticProps or getServerSideProps', our componnet will do the async operations and result will returned as an object. Our components will have access this properties as their props property. 

### Add Dynamic Links

in portfolios page
      
      renderPosts(posts) {
          return posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/portfolio?title=${post.title}`}>//i added query parameter
                  <a> {post.title}</a>
                </Link>
              </li>
            );
          });
        }
        
 when that link is clicked, it will take the user to /portfolio/titleOFThePost 
 In order to access this query parameter, we use `useRouter` in functional componens and `withRouter` in class based components. 
 
          const Portfolio = () => {
           const router = useRouter();

           return (
             <BaseLayout>
               <h1>portfolio</h1>
               <p>{router.query.title}</p>
             </BaseLayout>
           );
         };

in this structure we will get a long url. We can fix this by addding `as` prop to <Link/>

           <Link
            as={`/portfolio/${post.id}`}
            href={`/portfolio?title=${post.title}`}
            >
            <a> {post.title}</a>
          </Link>

this is going to be our firs url:

         http://localhost:3000/portfolio/1
         
If we refresh the page we will get 404 page not found error because server does not know about this url. Routing is handled by next.js but if we want to add custom endpoint we should define a server inside next.js in dev environment. /server.js file includes the express server set up. In order to use dynamic routes:

next.js suppors nested routing. if you have this directory /pages/portfolio/al/abc will be serving for this request:

         http://localhost:3000/portfolio/al/abc
         
 /pages/portfolio/[] will be responsible for the dynamic routes. next.js will look for the pages inside /pages if nothing is found, it will look for the dynamic routes. 
 
 [] used for named parameter. if in url http://localhost:3000/portfolio/1 is used 1 will be injected in [1] our server will serve this file.
 
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
        
        
 ### Setting up Universal Dynamic Routing
 
         npm i next-routes
         
 create routes.js in the root directory.
 
 - add this setting to server.js
 
         const routes = require("./routes");
         const handle = routes.getRequestHandler(app)//before routing was handled by app.getRequestHandler
         
 - Now we need to use routes.js on the client side. in order to do it we need to add routes to /routes.js for the routes that we need to dynamically show. Because other way we had to create a new folder and place [].js files would make our pages folder mess. We use next-routes only for pages that we need to query parameter. 
 In order to test create a test.js in pages as add it to the Header like this:
 
        import { Link as DynamicLink } from "../../routes";

       <DynamicLink route="blog" params={{ id: "2" }}>
                <a>Hello world</a>
              </DynamicLink>



