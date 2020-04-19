### How Formik does about custom components

Formik Component passes "field" prop to the custom components. 

        field:{name:name, onBlur:f (eventOrString),onChange:f (eventOrPath), value:""}
        
 we spread this prop on the custom input.
 
       <Input type={type} {...field} {...rest} />
 
 This is how Formik is always informed about the value that we are writing. But the situatuon is different in the DatePicker component because this component has its own onChange and its arguments is "date". But in the Formik's onCHange function, we have to pass "event" or "path".
 
         const handleChange = (date) => {
            const { setFieldValue, setFieldTouched } = props.form;
            const { name } = props.field;
            setStartDate(date);
            // it internally uses the setstate. so it is async
            setFieldValue(name, date, true);
            setFieldTouched(name, true, true);
          };
          
  setFieldValue(nameOfTheField, valueOfTheField, validate)
  setFieldTouched(name, touched=true, true) ==> this is where Formik is informed that there is an active field, and then formik invokes handle change for this field.
  
  - Main drawback of client-side validation is that it relies on JavaScript. If users turn JavaScript off, they can easily bypass the validation. This is why validation should always be implemented on both the client and server. By combining server-side and client-side methods we can get the best of the two: fast response, more secure validation and better user experience.
  
### Create Portfolio from Cient App

- Once we submit our form we should make a post request to our /portfolios route. in /portfoliocreate page
 
          import { createPortfolio } from "../actions/index";
          import { Routes } from "../routes";
          const PortfolioCreate = (props) => {
          const [error, setError] = useState("");
          const savePortfolio = async (portfolioData, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await createPortfolio(portfolioData);
              setSubmitting(false);
              setError(undefined);
              Routes.pushRoute("/portfolios");
            } catch (e) {
              const error = e.message || "Server Error";
              setSubmitting(false);
              setError(error);
            }
          };
          return (
            <BaseLayout {...props.auth}>
              <BasePage title="I am Portfoliocreate" className="portfolio-create-page">
                <Row>
                  <Col md="6">
                    <PortfolioForm
                      error={error}
                      onSubmit={savePortfolio}
                    ></PortfolioForm>
                  </Col>
                </Row>
              </BasePage>
            </BaseLayout>
          );
        };
 
 createPortfolio() is an action that is defined in /actions. Before making any request, we define base axios instance:
 
         const axiosInstance = axios.create({
          baseURL: "http://localhost:3000/api/v1",
          timeout: 3000, });
          
          export const createPortfolio = async (portfolioData) => {
                     return await axiosInstance
                    .post("/portfolios", portfolioData, setAuthHeader())
                    .then((response) => response.data)
                    .catch((error) => rejectPromise(error));
          };
 in this function, we post the data to the /portfolios which will save the posted values to the db. rejectPromise() is to handle the error during the posting request:
 
         const rejectPromise = (resError) => {
          let error = {};
          if (resError && resError.response && resError.response.data) {
            error = resError.response.data;
          } else {
            error = resError;
          }
          return Promise.reject(error);
        };

### Portfolio Update Page
