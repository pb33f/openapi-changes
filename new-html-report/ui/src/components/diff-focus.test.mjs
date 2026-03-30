import {
  buildFocusedDiffSections,
  computeBlockRangeForChange,
} from './diff-focus.ts';

const originalSpec = `          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Order not found"
          }
        }`;

const modifiedSpec = `          },
          "400": {
            "description": "Invalid ID supplied and all the jazz has gone."
          }
        }`;

function highlighted(spec) {
  return Object.fromEntries(spec.split('\n').map((line, index) => [index + 1, line]));
}

describe('diff-focus', () => {
  it('keeps a modified property scoped to its own line context', () => {
    const sections = buildFocusedDiffSections(
      [{
        change: 1,
        changeText: 'modified',
        property: 'description',
        original: 'Invalid ID supplied',
        new: 'Invalid ID supplied and all the jazz has gone.',
        breaking: false,
        type: 'response',
        path: '$.paths["/store/order/{orderId}"].get.responses["400"].description',
        context: {
          originalLine: 3,
          originalColumn: 1,
          newLine: 3,
          newColumn: 1,
        },
      }],
      originalSpec,
      modifiedSpec,
      highlighted(originalSpec),
      highlighted(modifiedSpec),
    );

    expect(sections).toHaveLength(1);
    expect(sections[0].valueBlocks).toHaveLength(2);

    const originalContext = sections[0].contextBlocks.find(block => block.title === 'Original Context');
    const modifiedContext = sections[0].contextBlocks.find(block => block.title === 'Modified Context');

    expect(originalContext.lines.filter(line => line.emphasis !== 'normal').map(line => line.lineNum)).toEqual([3]);
    expect(modifiedContext.lines.filter(line => line.emphasis !== 'normal').map(line => line.lineNum)).toEqual([3]);
    // The 404 content may appear in context lines (normal emphasis) but must NOT be emphasized
    expect(originalContext.lines.filter(line => line.emphasis !== 'normal').some(line => line.content.includes('Order not found'))).toBe(false);
  });

  it('finds the full removed response block even when the semantic line points at the parent', () => {
    const lines = [
      '        "responses": {',
      '          "200": {',
      '            "description": "successful",',
      '          },',
      '          "400": {',
      '            "description": "Invalid ID"',
      '          },',
      '          "404": {',
      '            "description": "Order not found"',
      '          }',
      '        }',
    ];
    const range = computeBlockRangeForChange(lines, 1, {
      change: 4,
      changeText: 'object_removed',
      property: 'codes',
      original: '404',
      new: '',
      breaking: false,
      type: 'response',
      path: '$.paths["/store/order/{orderId}"].get.responses',
      context: {
        originalLine: 1,
        originalColumn: 1,
        newLine: 0,
        newColumn: 0,
      },
    });

    expect(range).toEqual({ start: 8, end: 10 });
  });
});
