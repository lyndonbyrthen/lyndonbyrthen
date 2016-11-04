<div class="window sec-content">

	<canvas id="canvas" resize="true" width="1200" height="800"></canvas>

</div>

<div class="info">

	<div class="content-con">
	    
		<div class="content container">
			<div class="info-bg"></div>
			<div class="col-xs-12 col-sm-12 col-md-12">
				<p>This experiment demonstrates how physics engine Box2dWeb and
					canvas framework Paper.js work together.</p>
				<p>The following rules are used:
				
				
				<ul>
					<li>'Bubbles' of four different sizes are randomly generated and
						added to the stage.</li>
					<li>The four standard sizes are determined according to the size of
						the stage.</li>
					<li>Bubbles are being added, one by one, until their collective
						surface area starts to exceed that of the stage.</li>
					<li>Each bubble takes one of four shades of grey. When collision
						occurs, the samller bubble takes on the shade of the larger one.
						In the case of a collision between bubbles of equal size, their
						shades are swapped.</li>
					<li>Every half second, the oldest bubble is removed and re-released
						from the bottom.</li>
				</ul>
				</p>
			</div>
		</div>
	</div>

	<div class="info-icon"></div>
</div>
