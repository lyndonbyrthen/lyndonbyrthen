import React from 'react'
import PropTypes from 'prop-types'
import Matter from '../libs/matter.min'

class App3 extends React.Component {
  
  constructor(props) {
    super(props);
    this.engine = this.engine.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props.menuItem.name,nextProps)
    if (this.props.isCurApp && !nextProps.isCurApp) {
      //console.log('will stop');
      this.en.pause();
    }
    else if (!this.props.isCurApp && nextProps.isCurApp) {
      //console.log('will start');
      this.en.resume();
    }
  }


  componentDidMount() {
    if (this.en) return;
    try {
      this.en = this.engine();
    } catch (e) {
      console.log(e,'ph error')
    }
    
  }

  componentWillUnmount() {
  }

  engine() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: this.refs.canvas,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var rows = 10,
        yy = 600 - 21 - 40 * rows;
    
    var stack = Composites.stack(400, yy, 5, rows, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 40, 40);
    });
    
    World.add(world, [
        stack,
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);
    
    var ball = Bodies.circle(100, 400, 50, { density: 0.04, frictionAir: 0.005});
    
    World.add(world, ball);
    World.add(world, Constraint.create({
        pointA: { x: 300, y: 100 },
        bodyB: ball
    }));

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    /*Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });*/

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        pause: () => {
            Runner.stop(runner)
        },
        resume: () => {
            Runner.start(runner,engine)
        }
    };
  }

  render() {

  	return (
  		<div ref='canvas'>
  		</div>
  	)
  }
}

export default App3;