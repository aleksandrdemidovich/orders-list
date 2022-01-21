import {Button, Container, Paper, styled, TextField} from '@mui/material';
import React from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addNewProduct} from "../../redux/products-reducer";
import Preloader from "../../components/Preloader";
import {AppStateType} from "../../redux/store";
import {AppStatusType} from "../../redux/app-reducer";


type FormikErrorType = {
    name?: string
    pricePerOne?: string
    description?: string
    img?: string
}

function NewProductPage() {

    const appStatus = useSelector<AppStateType, AppStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            pricePerOne: '',
            description: '',
            img: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.name) {
                errors.name = 'Required';
            }
            if (!values.pricePerOne) {
                errors.pricePerOne = 'Required';
            }
            if (!values.description) {
                errors.description = 'Required';
            }
            if (!values.img) {
                errors.img = 'Required';
            }
            return errors;
        },
        onSubmit: async (values) => {
            dispatch(addNewProduct({
                name: formik.values.name, pricePerOne: +formik.values.pricePerOne,
                description: formik.values.description, imgLink: formik.values.img
            }))
            formik.resetForm()
        },
    })

    if (appStatus === 'loading') {
        return <Preloader/>
    }

    return (
        <Container maxWidth="xl">
            <NewProductContainer elevation={8}>
                <h1>New Product</h1>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <NewProductInput variant={"outlined"} label={'Name'} required
                                     name="name"
                                     value={formik.values.name}
                                     onChange={formik.handleChange}
                                     error={!!formik.errors.name}
                                     helperText={formik.errors.name}/>
                    <NewProductInput variant={"outlined"} label={'Price'} required
                                     name="pricePerOne"
                                     value={formik.values.pricePerOne}
                                     onChange={formik.handleChange}
                                     error={!!formik.errors.pricePerOne}
                                     helperText={formik.errors.pricePerOne}/>
                    <NewProductInput variant={"outlined"} label={'Description'} required
                                     name="description"
                                     value={formik.values.description}
                                     onChange={formik.handleChange}
                                     error={!!formik.errors.description}
                                     helperText={formik.errors.description}/>
                    <NewProductInput variant={"outlined"} label={'Image link'} required
                                     name="img"
                                     value={formik.values.img}
                                     onChange={formik.handleChange}
                                     error={!!formik.errors.img}
                                     helperText={formik.errors.img}/>
                    <Button type="submit"
                            variant={"contained"}
                            color={"primary"}
                            style={{width: '80%', margin: '25px 0 25px 0'}}>
                        Create
                    </Button>
                </StyledForm>
            </NewProductContainer>
        </Container>
    );
}

export default NewProductPage;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`
const NewProductContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%; 
  margin: 100px auto;

  @media (min-width: 300px) and (max-width: 768px) {
    width: 90%;
  }
  @media (min-width: 769px) and (max-width: 1440px) {
    width: 50%;
  }
`
const NewProductInput = styled(TextField)`
  width: 80%;
  margin: 10px 0 10px 0;
`
