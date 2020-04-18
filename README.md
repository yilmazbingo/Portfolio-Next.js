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
  
 
