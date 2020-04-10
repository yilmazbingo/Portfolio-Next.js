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
- In server-side-rendering, server sends a populated page to the client upon request. But before sends the html, it has to make sure that, if there is any async operation to be completed and then it has to send the html. Next.js uses "react-loadable" package to detect if there is any async operation has to be done before sending the component. If there is, server will wait till that opetation is completed and then it will render the component.

Other wise client had to make 2 requests. In first request we would send the file with ready information, and inside the component's getDerivedStateFromProps lifecycle method we would start the async operation, most likely fetching data, so our client had to make another request to the server. We have to render our app twice. Rendering our react app on the server is extremely computationally intensive. Also we had to write extra alot of code. 

So in getInitialProps, after next.9.3 it is recommended to use 'getStaticProps or getServerSideProps', our componnet will do the async operations and result will returned as an object. Our components will have access this properties as their props property. 

