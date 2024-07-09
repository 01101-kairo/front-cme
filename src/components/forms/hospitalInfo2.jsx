import React, { useTransition } from 'react'
import { Form, Formik } from "formik"
import { Input } from "./../input"
import { Calculo, Macaco } from "./../forms/axios"
import * as Yup from"yup"
import {Container, Content, Row, Footer, Button } from './StyledComponents'
import { useNavigate } from 'react-router-dom'

const segundosDadosDoHospital = () => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const json =  JSON.parse(localStorage.getItem('formulario'))

  const initialValues = {
    leitoUti: json?.leitoUti ?? 0,
    leitoInternacao: json?.leitoInternacao ?? 0,
    leitoRpa: json?.leitoRpa ?? 0,
    leitoobservacao: json?.leitoobservacao ?? 0,
    leitoHospitalDia: json?.leitoHospitalDia ?? 0,
    totalDeAutoclaves: json?.totalDeAutoclaves ?? 0,
    totalDeLavadorasTermo: json?.totalDeLavadorasTermo ?? 0
  }

  const validationSchema = Yup.object({
    leitoUti: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
    leitoInternacao: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
    leitoRpa: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
    leitoobservacao: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
    leitoHospitalDia: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
    totalDeAutoclaves: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
    totalDeLavadorasTermo: Yup.number().required("Campo obrigatório").min(1, "Deve ser maior que 0"),
  })


  const handleSaveToLocalStorage = (values) => {
    const existingValues = JSON.parse(localStorage.getItem('formulario')) || {}
    const updatedValues = { ...existingValues, ...values }
    localStorage.setItem('formulario', JSON.stringify(updatedValues))
  }


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      handleSaveToLocalStorage(values)

      await Macaco()
      const calculoResult = await Calculo()
      const { autoclave, lavadora } = calculoResult
      startTransition(() => {
        navigate('/tabela', { state: { autoclave, lavadora } })
      })

      setSubmitting(false)

    } catch (error) {
      console.error('Error during calculation:', error)
      setSubmitting(false)
    }finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <Content
      >
        <Formik
          id='form'
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ isSubmitting}) => (
            <>
              {isSubmitting || isPending ? (
                <p style={{height: "50vh" }}>Carregando...</p>
              ) : (
                  <Form style={{ width: "90%" }}>
                    <Row>
                      <Input name="leitoUti" label="leitos de UTI" type="number" required />
                      <Input name="leitoInternacao" label="leito de internação" type="number" required />
                    </Row>
                    <Row>
                      <Input name="leitoRpa" label="leitos de RPA" type="number" required />
                    </Row>
                    <Row>
                      <Input name="leitoobservacao" label="leitos de observação" type="number" required />
                      <Input name="leitoHospitalDia" label="leitos de hospital dia" type="number" required />
                    </Row>
                    <Row>
                      <Input name="totalDeAutoclaves" label="total de autoclaves" type="number" required />
                      <Input name="totalDeLavadorasTermo" label="total de lavadoras termo" type="number" required />
                    </Row>
                    <Footer>
                      <Button type='button' onClick={() => navigate('/hospital1')}>
                        voltar
                      </Button>
                      <Button type="submit" disabled={isSubmitting || isPending}>
                        proximo
                      </Button>
                    </Footer>
                  </Form>
                )}
            </>
          )}
        </Formik>
      </Content>
    </Container>
  )
}

export default segundosDadosDoHospital
