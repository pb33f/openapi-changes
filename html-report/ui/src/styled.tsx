import styled from "styled-components";

// @ts-ignore
export const StyledForeignObject = styled.foreignObject<{
    hasCollapse?: boolean;
    hideCollapse?: boolean;
    isObject?: boolean;
    isBreaking?: boolean
}>`
  text-align: ${({ isObject }) => !isObject && "center"};
  font-size: 12px;
  overflow: hidden;
  color: ${({ isBreaking }) => {
      if (isBreaking) {
          return "red";
      }
      return "#62c4ff";
  }};
  pointer-events: none;
  padding-top: 2px;
  padding-left: 5px;
  //border: 1px solid ${isBreaking => isBreaking ? "#62c4ff" : "red"};
  border: 1px solid  ${({ isBreaking }) => isBreaking && "red"};

  border-radius: 2px;
  cursor: pointer;


  :hover {
    border: 1px solid orange;
  }
  
  

  * {
    font-family: "Roboto Mono", monospace;
  }
  
  *:hover {
    border-color: orange;
  }
    
  .changed, .original {
    margin-top: 5px;
    font-size: 0.7em;
  }
`;
