import styled from "styled-components";

// @ts-ignore
export const StyledForeignObject = styled.foreignObject<{
    isObject?: boolean;
    isBreaking?: boolean;
    isClickable?: boolean;
}>`
  text-align: ${({isObject}) => !isObject && "center"};
  font-size: 12px;
  overflow: hidden;
  color: ${({isBreaking}) => {
    if (isBreaking) {
      return "var(--error-color)";
    }
    return "var(--primary-color)";
  }};
  pointer-events: none;
  padding-top: 2px;
  padding-left: 5px;
  border: ${({isBreaking, isClickable}) => {
    if (isBreaking) {
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
  
  * {
    font-family: var(--font-family);
  }

  .changed, .original {
    margin-top: 5px;
    font-size: 0.9em;
  }
`;
