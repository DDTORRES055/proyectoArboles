
var cy = cytoscape({

    container: document.getElementById('container'), // container to render in
  
    

    elements: {
      nodes: [
        { data: { id: 'a', name: 'Ana' }, },
        { data: { id: 'e', name: 'Elaine' } },
        { data: { id: 'k', name: 'Kramer' } },
        { data: { id: 'g', name: 'George' } }
      ],
      edges: [
        { data: { source: 'a', target: 'e' } },
        { data: { source: 'a', target: 'k' } },
        { data: { source: 'e', target: 'g' } }
      ]
    },

    style: [
      {
        selector: 'node[name]',
        style: {
          'content': 'data(name)'
        }
      },

      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle'
        }
      },

      // some style for the extension

      {
        selector: '.eh-handle',
        style: {
          'background-color': 'red',
          'width': 12,
          'height': 12,
          'shape': 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12, // makes the handle easier to hit
          'border-opacity': 0
        }
      },

      {
        selector: '.eh-hover',
        style: {
          'background-color': 'red'
        }
      },

      {
        selector: '.eh-source',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },

      {
        selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },

      {
        selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
      },

      {
        selector: '.eh-ghost-edge.eh-preview-active',
        style: {
          'opacity': 0
        }
      }
    ],

    layout: {
      name: 'dagre'
    }
  
  });

  cy.edgehandles();
  
  var Nodes = cy.json().elements.nodes;

  function addNode(){
    cy.add({
      group: 'nodes',
      data: { id: 'h', name: 'Hola', weight: 75 },
      position: { x: 200, y: 200 }
  });
  }

  function addNodes(){
    var eles = cy.add([
      { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
      { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
      { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
    ]);
    console.log(eles);
  }

  cy.on('taphold', function(evt){
    var element = evt.target;
    cy.remove(element);

    Nodes = cy.json().elements.nodes;


    if(Nodes == undefined){
      clear();
    }
  });


  function clear() {

    cy = cy = cytoscape({

      container: document.getElementById('container'), // container to render in

      elements: {
        nodes: [],
        edges: []
      },
  
      style: [
        {
          selector: 'node[name]',
          style: {
            'content': 'data(name)'
          }
        },
  
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle'
          }
        },
  
        // some style for the extension
  
        {
          selector: '.eh-handle',
          style: {
            'background-color': 'red',
            'width': 12,
            'height': 12,
            'shape': 'ellipse',
            'overlay-opacity': 0,
            'border-width': 12, // makes the handle easier to hit
            'border-opacity': 0
          }
        },
  
        {
          selector: '.eh-hover',
          style: {
            'background-color': 'red'
          }
        },
  
        {
          selector: '.eh-source',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },
  
        {
          selector: '.eh-target',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },
  
        {
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': 'red',
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red'
          }
        },
  
        {
          selector: '.eh-ghost-edge.eh-preview-active',
          style: {
            'opacity': 0
          }
        }
      ],
  
      layout: {
        name: 'grid',
        rows: 2,
        cols: 2
      }
    
    });

    cy.edgehandles();
  }