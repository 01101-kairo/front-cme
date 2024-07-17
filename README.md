### Documentação da Integração com SheetMonkey

#### Propósito da Integração
- **Descrição**: Integração com SheetMonkey para enviar leads para uma planilha do Google Excel.
- **API**: [SheetMonkey](https://dashboard.sheetmonkey.io/checkout)

### Documentação da Sua API (Back-CME)

#### Propósito da API
- **Descrição**: API desenvolvida para retornar uma lista de equipamentos ideais de autoclaves e lavadoras para hospitais, com base nos dados fornecidos.
- **Documentação**: [Documentação da API](https://back-cme.onrender.com/api-docs/)
- **Repositório GitHub**: [GitHub - Back-CME](https://github.com/01101-kairo/back-cme)

### Documentação Geral do Projeto Frontend

- **Framework**: Vite.js com React.
- **Bibliotecas**: Yup para validação, Formik para gerenciamento de formulários, axios e react-router, styled-components.
- **Estrutura de Páginas**: Três páginas de formulário com o mesmo componente de entrada (`input.jsx`) reutilizado.
- **Componentes Reutilizáveis**: Os componentes `input.jsx` e estilizados do arquivo `styledComponents.jsx` são utilizados em todas as páginas do formulário.
- **Fluxo de Integração**: Os dados são enviados pelo usuário através do formulário. O Yup é utilizado para validar os dados antes do envio, garantindo que todos os campos obrigatórios estejam preenchidos.
