import { graphql } from "react-relay/hooks";

export default graphql`
  fragment SubDepartmentFragment_subDepartment on SubDepartment {
    id
    pictureUrl
    subDepartment
  }
`;
