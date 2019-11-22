var cy = cytoscape({

    container: document.getElementById('container'), // container to render in



    elements: {
        nodes: [
            { data: { id: 0, name: 'Ana' }, },
            { data: { id: 1, name: 'Elaine' } },
            { data: { id: 2, name: 'Kramer' } },
            { data: { id: 3, name: 'George' } }
        ],
        edges: [
            { data: { source: 0, target: 1 } },
            { data: { source: 0, target: 2 } },
            { data: { source: 2, target: 3 } }
        ]
    },

    style: [{
            selector: 'node[name]',
            style: {
                'content': 'data(name)',
                'color': '#fff'
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
var Edges = cy.json().elements.edges;
var currentId = Nodes[Nodes.length - 1].data.id;

function addNode() {
    cy.add({
        group: 'nodes',
        data: { id: ++currentId, name: document.getElementById('nameNode').value },
        position: { x: 200, y: 200 }
    });

    refresh();
}

cy.on('taphold', function(evt) {
    var element = evt.target;
    cy.remove(element);

    refresh();

    if (Nodes == undefined) {
        clear();
    }
});

function testTree() {
    var conditions = [false, false, false, false, false, false];
    var rootTree = [];
    var targets = [];
    var gradeOne = true;
    for (var i = 0; i < Edges.length; i++) targets[i] = Edges[i].data.target;
    console.log(targets);
    var idNodes = [];
    for (var i = 0; i < Nodes.length; i++) idNodes[i] = Nodes[i].data.id;
    console.log(idNodes);
    rootTree = idNodes.filter(node => !targets.includes(node));
    idNodes = idNodes.filter(node => !rootTree.includes(node));
    console.log(rootTree);
    console.log(idNodes);
    for (var i = 0, c = 0; i < idNodes.length; i++) {
        for (var j = 0; j < targets.length; j++) {
            if (idNodes[i] == targets[j] && ++c != 1) {
                gradeOne = false;
                break;
            }
        }
        c = 0;
    }

    if (Nodes.length - 1 == Edges.length) conditions[0] = true;

    if (rootTree.length == 1 && gradeOne) conditions[1] = true;

    console.log(conditions);

    if (conditions[0] && conditions[1]) {
        document.getElementById('response').innerHTML = 'Si es un arbol';
        document.getElementById('response').style.color = 'green';
    } else {
        document.getElementById('response').innerHTML = 'No es un arbol';
        document.getElementById('response').style.color = 'red';
    }
}

cy.on('mousemove', function(evt) {
    refresh();
});

function refresh() {
    Nodes = cy.json().elements.nodes;
    Edges = cy.json().elements.edges;
    if (Nodes != undefined) {
        Nodes = Nodes.filter(node => node.data.id < 5000);
    }
    if (Edges != undefined) {
        Edges = Edges.filter(edge => edge.data.target < 5000);
    }
}

function clear() {

    cy = cy = cytoscape({

        container: document.getElementById('container'), // container to render in

        elements: {
            nodes: [],
            edges: []
        },

        style: [{
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

    cy.on('taphold', function(evt) {
        var element = evt.target;
        cy.remove(element);

        refresh();

        if (Nodes == undefined) {
            clear();
        }
    });

    cy.on('mouseout', function(evt) {
        refresh();
    });
}