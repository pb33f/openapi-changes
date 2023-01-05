import styled from "styled-components";

// @ts-ignore
export const StyledForeignObject = styled.foreignObject<{
    isObject?: boolean;
    isBreaking?: boolean;
    isClickable?: boolean;
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
  border: ${({ isBreaking, isClickable }) => {
      if(isBreaking) {
          return "2px solid var(--error-color)"
      }
      if (!isClickable) {
          return '1px dashed var(--primary-color-lowalpha)';
      } else {
        return '1px solid var(--primary-color)';
      }
  }
};

  border-radius: 2px;



  :hover {
    border: 1px solid orange;
    cursor:  ${({ isClickable }) => {
      if (isClickable) {
        return "pointer";
      }
      return "none";
    }};
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
