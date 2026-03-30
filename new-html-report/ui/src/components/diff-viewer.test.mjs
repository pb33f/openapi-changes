import './diff-viewer.ts';

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

describe('diff-viewer focused changes', () => {
  it('renders a semantic change card without conflating sibling removals', async () => {
    const element = document.createElement('openapi-changes-diff-viewer');
    element.originalSpec = originalSpec;
    element.modifiedSpec = modifiedSpec;
    element.originalHighlighted = highlighted(originalSpec);
    element.modifiedHighlighted = highlighted(modifiedSpec);
    element.selectedChanges = [{
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
    }];

    document.body.appendChild(element);
    await element.updateComplete;

    const text = element.shadowRoot.textContent;
    expect(text).toContain('Focused');
    expect(text).toContain('Modified: description');
    expect(text).toContain('Original Value');
    expect(text).toContain('Modified Value');
    expect(text).toContain('Original Context');
    expect(text).toContain('Modified Context');
    // Scoping of emphasized vs context lines is tested in diff-focus.test.mjs
  });
});
