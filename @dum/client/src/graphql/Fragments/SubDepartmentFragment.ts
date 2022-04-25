import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment SubDepartmentFragment_subDepartment on SubDepartment {
    id
    rowId
    pictureUrl
    subDepartment
    description
  }
`;
