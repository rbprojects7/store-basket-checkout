import styled, { createGlobalStyle } from 'styled-components';

export const GlobalTableStyle = createGlobalStyle`
  table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,
  td,
  tr {
    padding: 5px;
  }
  th, td {
    text-align: center;
  }
  }
`;

export const CatalogHeader = styled.h2`
    font-weight: normal;
    color: #666;
`;