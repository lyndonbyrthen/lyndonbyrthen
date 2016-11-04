(function(lb, experiments_physics){
	
	var lbSlider = lb.module('lbSlider');

	var b2Vec2 = Box2D.Common.Math.b2Vec2, b2AABB = Box2D.Collision.b2AABB, b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2Fixture = Box2D.Dynamics.b2Fixture, b2World = Box2D.Dynamics.b2World, b2MassData = Box2D.Collision.Shapes.b2MassData, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, b2DebugDraw = Box2D.Dynamics.b2DebugDraw, b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

	var ep = experiments_physics;
	
    var pScope = new paper.PaperScope();
    pScope.install(this);
    	
	ep.ContentView = lbSlider.ContentView.extend({
		
		bodyList : new Array(),
		mHandler : null,
		resizeTimeout : null,
		parent : null,
		canvas : null,
		resizeHandler : null,
		mousemoveHandler : null,
		update : null,
		resizeFunc : null,
		worldScale : 30,
		context : null,
		totalSpriteArea : 0,
		pathList : new Array(),
		contanctListener : new 	Box2D.Dynamics.b2ContactListener(),
		fillColorList : ['#E8E8E8','#B8B8B8','#C8C8C8','#D8D8D8'],
		paperProject : null,
		paperView : null,
	
		
		initialize : function(options) {
			this.constructor.__super__.initialize.apply(this,arguments);		
			this.parent = options.parent;
			var scope = this;

			this.canvas = $('#canvas',this.parent.$el);

			this.context = this.canvas.get(0).getContext("2d");
						
			paper = pScope;
			paper.setup(this.canvas.get(0));	
			
			
			this.world = new b2World(new b2Vec2(0, -30) // gravity
			, true // allow sleep
			);
			var world = this.world;

			this.fixDef = new b2FixtureDef;
			var fixDef = this.fixDef;
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox(2, 2);
			fixDef.density = 1.0;
			fixDef.friction = 2.5;
			fixDef.restitution = .8;

			this.bodyDef = new b2BodyDef;
			var bodyDef = this.bodyDef;
			bodyDef.type = b2Body.b2_staticBody;

			this.topWall = world.CreateBody(bodyDef);
			this.topWall.CreateFixture(fixDef);

			/*
			 * this.bottomWall = world.CreateBody(bodyDef);
			 * this.bottomWall.CreateFixture(fixDef);
			 */

			this.leftWall = world.CreateBody(bodyDef);
			this.leftWall.CreateFixture(fixDef);

			this.rightWall = world.CreateBody(bodyDef);
			this.rightWall.CreateFixture(fixDef);

			this.debugDraw = new b2DebugDraw();
			var debugDraw = this.debugDraw;

			debugDraw.SetSprite(this.context);
			debugDraw.SetDrawScale(30.0);
			debugDraw.SetFillAlpha(0.5);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
			
			world.SetContactListener(this.contanctListener);
			
			// setting up all event handlers with the correct scope
			
			this.endContact = $.proxy(function(contact){
				
				
				if (contact.GetFixtureA().GetBody().GetDefinition().type == b2Body.b2_staticBody
						|| contact.GetFixtureB().GetBody().GetDefinition().type == b2Body.b2_staticBody) return;
			
				var d1 = contact.GetFixtureA().GetBody().GetUserData();
				var d2 = contact.GetFixtureB().GetBody().GetUserData();
				
				var r1 = contact.GetFixtureA().GetShape().GetRadius();
				var r2 = contact.GetFixtureB().GetShape().GetRadius();
				
				//console.log(r1+"  ::  "+r2);
				
				if (r1 < r2) {
					d1.fillColor = d2.fillColor;
				} else if (r1 > r2) {
					d2.fillColor = d1.fillColor;
				} else {
					var temp = d1.fillColor;
					d1.fillColor = d2.fillColor;
					d2.fillColor = temp;
				}
				
			});

			this.resizeHandler = $.proxy(function(event) {
				//trace('physics on relize');
				clearInterval(this.resizeTimeout);
				this.pause();
				this.destroy();
				//trace(this.parent.$el.css('display'));
				if (this.parent.$el.css('display') != 'none') {
					this.resizeTimeout = setTimeout(this.resizeFunc, 1000);
				}
			}, this);

			this.mousemoveHandler = $.proxy(function(event) {

				this.canvasPosition = this.getElementPosition(this.canvas.get(0));

				this.mouseX = (event.clientX - this.canvasPosition.x)
						/ this.worldScale;
				this.mouseY = (event.clientY - this.canvasPosition.y)
						/ this.worldScale;
			}, this);
			
			
			this.mousedownHandler = $.proxy(function(event) {
				this.isMouseDown = true;
				this.mousemoveHandler(event);
				this.canvas.on('mousemove', this.mousemoveHandler);
			}, this);

			this.mouseupHandler = $.proxy(function(event) {
				this.canvas.unbind('mousemove', this.mousemoveHandler);
				this.isMouseDown = false;
				this.mouseX = undefined;
				this.mouseY = undefined;
			}, this);

			this.update = $.proxy(function(event) {
				/*
				 * try { console.log('updating'); } catch (e) { }
				 */
				//this.context.clearRect(0, 0, this.worldW, this.worldH);
				
				if (this.isMouseDown && (!this.mouseJoint)) {
					var body = this.getBodyAtMouse();
					if (body) {
						var md = new b2MouseJointDef();
						md.bodyA = this.world.GetGroundBody();
						md.bodyB = body;
						md.target.Set(this.mouseX, this.mouseY);
						md.collideConnected = true;
						md.maxForce = 2000.0 * body.GetMass();
						this.mouseJoint = this.world.CreateJoint(md);
						body.SetAwake(true);
					}
				}

				if (this.mouseJoint) {
					if (this.isMouseDown) {
						this.mouseJoint.SetTarget(new b2Vec2(this.mouseX,
								this.mouseY));
					} else {
						this.world.DestroyJoint(this.mouseJoint);
						this.mouseJoint = null;
					}
				}

				this.world.Step(1 / 60, 10, 10);
				//this.world.DrawDebugData();

				for ( var b = this.world.m_bodyList; b != null; b = b.m_next) {
					if (b.GetUserData()) {
						
						var circle = b.GetUserData();
						circle.position = new Point(b.GetPosition().x
								* this.worldScale, b.GetPosition().y
								* this.worldScale);	
						circle.absRotate(b.GetAngle()*180/Math.PI);
						
					}
				}
				paper = pScope;
				paper.view.draw();
				
				// for(var b = this.world.m_bodyList; b != null; b = b.m_next){
				// if(b.GetUserData()){ var radius =
				// b.GetFixtureList().GetShape().GetRadius(); this.context.save();
				// this.context.translate(b.GetPosition().x*this.worldScale,b.GetPosition().y*this.worldScale);
				// this.context.rotate(b.GetAngle());
				// this.context.drawImage(b.GetUserData(),-radius*this.worldScale,-radius*this.worldScale,radius*2*this.worldScale,radius*2*this.worldScale);
				// this.context.restore(); } }

				this.world.ClearForces();

				this.request = window.requestAnimFrame(this.update);
			}, this);

			this.resizeFunc = $.proxy(function() {
				this.start();
			}, this);

			this.startAdding = $.proxy(function() {
				// console.log(this.totalSpriteArea);
				// if (this.bodyList.length >= 60) {
				if (this.totalSpriteArea >= this.worldW * this.worldH / 2) {
					clearInterval(this.intId);
					this.intId = window.setInterval(this.swapBody, 500);
				} else {
					this.addBody();
				}
			}, this);

			this.addBody = $.proxy(
					function() {
						// console.log(this.worldScale);
						
						var circle = this.getRandomSymbol().clone();
						var radius = circle.strokeBounds.width / 2 /this.worldScale;
						var x = Math.random() * (this.worldW / this.worldScale - 2 * radius) + radius + 1;
						var y = this.worldH / this.worldScale + radius;
						circle.position = new Point(x,y);
						circle.fillColor = this.getRandomFillColor();
						circle.visible = true;
												
						this.bodyDef.type = b2Body.b2_dynamicBody;					
						this.fixDef.shape = new b2CircleShape(radius); // radius

						this.bodyDef.position.x = x;
						this.bodyDef.position.y = y;

						// this.bodyDef.userData = this.sprite_badge;
						this.bodyDef.userData = circle;

						var body = this.world.CreateBody(this.bodyDef);
						body.CreateFixture(this.fixDef);
						this.bodyList.push(body);

						this.totalSpriteArea += Math.pow((2 * radius * this.worldScale), 2);
						
					}, this);

			this.swapBody = $.proxy(function() {
				
				var circle = this.getRandomSymbol().clone();
				var radius = circle.strokeBounds.width/2/this.worldScale;
				var x = Math.random() * (this.worldW / this.worldScale - 2 * radius) + radius + 1;
				var y = this.worldH / this.worldScale + radius;
				circle.position = new Point(x,y);
				circle.fillColor = this.getRandomFillColor();
				circle.visible = true;
				
				var body = this.bodyList.shift();
				this.bodyList.push(body);
				
				body.GetUserData().remove();
				body.SetUserData(circle);

				body.GetFixtureList().GetShape().SetRadius(radius);

				var trans = body.GetTransform();
				trans.position.Set(x,y);
				body.SetTransform(trans);
				// console.log(body);
			}, this);

		},

		start : function() {
//			trace('physics::start');
			this.parent.infoView.$el.fadeIn('fast');
			paper = pScope;
			
			$(window).on('resize', this.resizeHandler);

			this.updateDimension();

			this.createPaths();
			
			this.contanctListener.EndContact = this.endContact;

			var worldW = this.worldW;
			var worldH = this.worldH;

			var world = this.world;
			var fixDef = this.fixDef;
			var bodyDef = this.bodyDef;

			// create walls
			// top
			this.topWall.GetFixtureList().GetShape().SetAsBox(
					worldW / this.worldScale, 2);
			var trans = this.topWall.GetTransform();
			trans.position.Set(0, -1.9);
			this.topWall.SetTransform(trans);

			// bottom
			/*
			 * this.bottomWall.GetFixtureList().GetShape().SetAsBox(worldW / 30, 2);
			 * var trans = this.bottomWall.GetTransform(); trans.position.Set(0,
			 * worldH / 30 + 1.9); this.bottomWall.SetTransform(trans);
			 */

			// left
			this.leftWall.GetFixtureList().GetShape().SetAsBox(2,
					worldH / this.worldScale * 3);
			var trans = this.leftWall.GetTransform();
			trans.position.Set(-1.9, 0);
			this.leftWall.SetTransform(trans);

			// right
			this.rightWall.GetFixtureList().GetShape().SetAsBox(2,
					worldH / this.worldScale * 3);
			var trans = this.rightWall.GetTransform();
			trans.position.Set(worldW / this.worldScale + 1.9, 0);
			this.rightWall.SetTransform(trans);

			// start to add bodies
			this.intId = window.setInterval(this.startAdding, 100);

			// mouse
			this.canvas.on('mousedown', this.mousedownHandler);
			this.canvas.on('mouseup', this.mouseupHandler);

			this.request = window.requestAnimFrame(this.update);

		},

		updateDimension : function() {
			this.canvas.attr('width', this.canvas.width());
			this.canvas.attr('height', this.canvas.height());

			this.worldW = parseInt(this.canvas.attr('width'));
			this.worldH = parseInt(this.canvas.attr('height'));

			this.longSide = this.worldW;
			if (this.longSide < this.worldH) {
				this.longSide = this.worldH;
			}
		},

		pause : function() {
			// $(window).unbind('resize', this.resizeHandler);
			this.parent.infoView.$el.fadeOut('fast');
			this.canvas.unbind();
			window.cancelRequestAnimFrame(this.request);
			//this.contanctListener.EndContact = null;
			clearInterval(this.intId);
		},

		destroy : function() {
			
			$(window).unbind('resize', this.resizeHandler);
			this.canvas.unbind();
			window.cancelRequestAnimFrame(this.request);
			this.contanctListener.EndContact = this.endContact;
			
			while (this.bodyList.length > 0) {
				var b = this.bodyList.shift();
				b.GetUserData().remove();
				this.world.DestroyBody(b);
			}

			this.totalSpriteArea = 0;
			this.context.clearRect(0, 0, this.worldW, this.worldH);

		},

		createPaths : function(n, offset) {
			if (!n) { n = 4 }

			if (!offset) { offset = 2 }
			
			while(this.pathList.length>0) {
				var path = this.pathList.pop();
				path.remove();
			}
			
			for ( var i = 0; i < n; i++) {
				var radius = Math.floor((i + offset) / 10 * (this.longSide / this.worldScale) / 8 * this.worldScale);
				
				var path = new Path.Circle(new Point(20, 20), radius);
				path.fillColor = '#E8E8E8';
				//path.opacity = .6;
				path.strokeColor = '#A8A8A8';
				path.dashArray = [5, 5];
				path.strokeWidth = 1;
				path.visible = false;
				this.pathList.push(path);
			}

		},

		getRandomSymbol : function() {
			var random = Math.floor(Math.random() * this.pathList.length);
			return this.pathList[random];
		},
		
		getRandomFillColor : function() {
			var random = Math.floor(Math.random() * this.fillColorList.length);
			return this.fillColorList[random];
		},

		getElementPosition : function(element) {
			var elem = element, tagname = "", x = 0, y = 0;
			while ((typeof (elem) == "object")
					&& (typeof (elem.tagName) != "undefined")) {
				y += elem.offsetTop;
				x += elem.offsetLeft;
				tagname = elem.tagName.toUpperCase();
				if (tagname == "BODY")
					elem = 0;
				if (typeof (elem) == "object") {
					if (typeof (elem.offsetParent) == "object")
						elem = elem.offsetParent;
				}
			}
			return {
				x : x,
				y : y
			};
		},

		getBodyAtMouse : function() {
			this.mousePVec = new b2Vec2(this.mouseX, this.mouseY);
			var aabb = new b2AABB();
			aabb.lowerBound.Set(this.mouseX - 0.001, this.mouseY - 0.001);
			aabb.upperBound.Set(this.mouseX + 0.001, this.mouseY + 0.001);
			// Query the world for overlapping shapes.
			this.selectedBody = null;
			this.world.QueryAABB($.proxy(this.getBodyCB, this), aabb);
			return this.selectedBody;
		},

		getBodyCB : function(fixture) {
			if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
				if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(),
						this.mousePVec)) {
					this.selectedBody = fixture.GetBody();
					return false;
				}
			}
			return true;
		}
	});
		
})(lb, lb.module('experiments_physics'));