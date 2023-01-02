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
          return "var(--error-color)";
      }
      return "var(--primary-color)";
  }};
  pointer-events: none;
  padding-top: 2px;
  padding-left: 5px;
  //border: 1px solid ${isBreaking => isBreaking ? "var(--primary-color)" : "var(--error-color)"};
  border: 1px solid  ${({ isBreaking }) => isBreaking && "var(--error-color)"};

  border-radius: 2px;



  :hover {
    border: 1px solid orange;
    cursor: pointer;
  }
  
  

  * {
    font-family: "Roboto Mono", monospace;
  }
  
  *:hover {
    border-color: orange;
  }
    
  .changed, .original {
    margin-top: 5px;
    font-size: 0.9em;
  }
`;
