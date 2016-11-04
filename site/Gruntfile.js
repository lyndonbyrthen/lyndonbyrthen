module.exports = function(grunt) {

	var distFolder = './gruntDist/';
	var distZip = './gruntDist.zip';
  var imagesZip = './images.zip';
	var today = new Date();
	var version = '.'+today.getUTCFullYear()+'.'+(today.getUTCMonth()+1)+'.'+today.getUTCDate()+'.'+Math.floor(Math.random()*1000000);

  // Project configuration.
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	watch: {
  		scripts: {
  			files: ['./src/application/views/**'],
  			tasks: ['bake'],
  			options: {
  				spawn: false,
  			},
  		},
  	},
  	bake: {
  		email_templates: {
  			options: {
                // Task-specific options go here.
            },
            files: {
            	"src/application/views/email_templates/order_confirmation_tpl.php": "src/application/views/email_templates/order_confirmation.php"
            }
        }
    },
    copy: {
    	libFiles: {
    		src:'public_html/js/lib/**',
    		dest: distFolder
    	},
    	cssFiles: {
    		src:'public_html/css/lib/**',
    		dest: distFolder
    	},
      xmlFiles: {
        src:'public_html/*.xml',
        dest: distFolder
      },
    /*	imgFiles: {
    		src:'public_html/images/**',
    		dest: distFolder
    	},*/
    	flexiIncludes: {
    		src:['public_html/includes/**','public_html/flexi_cart_includes/**'],
    		dest: distFolder
    	},
    	srcFiles: {
    		options: { dot: true},
    		src:['src/**','src/**/.*'],
    		dest: distFolder
    	},
    	rootFiles: {
    		src:['public_html/*.php','public_html/.htaccess','public_html/*.ico'],
    		dest: distFolder
    	},
    	formhelperFiles: {
    		src:['public_html/css/img/**'],
    		dest: distFolder
    	}
    },
    replace: {
  	  //append version number to css files
  	  insertVersion: {
  	  	src: [distFolder+'**/*.html',distFolder+'**/*.php'],
  	  	overwrite: true, 
  	  	replacements: [{
  	  		from: /(<!--(\s*?)build-insert-version-css(\s*?)-->)([\s\S]*?)(\.css)/g,
  	  		to: '$4'+''+'$5'}] 
  	  },
  	  //insert a js file
	  	insertJS: {
	  		src: [distFolder+'**/*.html',distFolder+'**/*.php'],
	  		overwrite: true, 
	  		replacements: [{
	  			from: /<!--(\s*)build-insert-js(\s*)\{(.*)\.js\}(\s*)-->/g,
	  			to: '<script type="text/javascript" src="$3'+''+'.js"></script>'}] 
	  	},
  	  //remove files (that are to be replaced by a concatenated single file)
  	  removeReferences: {
  	  	src: [distFolder+'**/*.html',distFolder+'**/*.php'],
  	  	overwrite: true, 
  	  	replacements: [{
  	  		from: /(<!--(\s*)build-remove(\s*)-->)([\s\S]*?)(<!--(\s*)end-build-remove(\s*)-->)/g,
  	  		to: ''}] 
  	  	}
  	 },
	  compress: {
	  	main: {
	  		options: {archive: distZip },
        files: [ {src: [distFolder+'**/**'], dest: '/',dot: true}] // includes files in path and its subdirs
      },
      images: {
        options: {archive: imagesZip },
        files: [ {src: ['public_html/images/**/**'], dest: '/',dot: true}] // includes files in path and its subdirs
      }
    }
});

  //Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-sftp-deploy');
  grunt.loadNpmTasks( "grunt-bake" );
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('default', 'Main build', function() {
  	grunt.log.writeln('Starting build begins:');
	  //create a the dist folder, if an older version exist delete it
	  if (grunt.file.exists(distFolder)) grunt.file.delete(distFolder,{force:true});
	  grunt.file.mkdir(distFolder);

	  if (grunt.file.exists(distZip)) grunt.file.delete(distZip,{force:true});
    if (grunt.file.exists(imagesZip)) grunt.file.delete(imagesZip,{force:true});

	  grunt.log.writeln('Dist folder created');
	  
	  //compact js files
	  grunt.file.expand(['public_html/js/**/*.js','!public_html/js/lib/**/*.js']).forEach(function (file) {

	  	var path = file.substr(0,file.lastIndexOf('.js'));
	  	var uglify = grunt.config.get('uglify') || {};

	  	uglify[path] = {
	  		src: './'+file,
	  		dest: distFolder+path+'.js'
	  	}

	  	grunt.config.set('uglify', uglify);

	  	//grunt.log.writeln('file name = '+distFolder+path+version+'.js');

	  });
	  
	  //minify css files
	  grunt.file.expand(['public_html/css/**/*.css','!public_html/css/lib/**/*.css','!public_html/css/img/**/*.css']).forEach(function (file) {

	  	var path = file.substr(0,file.lastIndexOf('.css'));
		  var cssmin = grunt.config.get('cssmin') || {};

      var files = {}
      var toPath = distFolder+path+'.css';
      var fromPath = './'+file;

      files[toPath] = fromPath;

		  cssmin[path] = {
        files: files
      }
		  
      grunt.config.set('cssmin', cssmin);

		});

	  //grunt.task.run('bake');
	  grunt.task.run('copy');

	  grunt.task.run('cssmin');
	  grunt.task.run('uglify');
	  
	  grunt.task.run('replace');
	  grunt.task.run('compress');
	});

  
  grunt.registerTask('stage-deploy', 'Pushing zipped files to stage', function() {
  	var sftp = grunt.config.get('sftp') || {};
  	sftp['push-zip'] = {
  		files: {
  			"./": "gruntDist.zip"
  		},
  		options: {
  			path: '/var/www',
  			host: '54.187.176.227',
  			username: 'ec2-user',
  			password: 'ling7378',
  			directoryPermissions: parseInt(755, 8),
  			showProgress: true
  		}
  	};

  	grunt.config.set('sftp', sftp);
  	grunt.task.run('sftp');
  });

  grunt.registerTask('stage-deploy-assets', 'Pushing zipped image files to stage', function() {
    var sftp = grunt.config.get('sftp') || {};
    sftp['push-zip'] = {
      files: {
        "./": "images.zip"
      },
      options: {
        path: '/var/www',
        host: '54.187.176.227',
        username: 'ec2-user',
        password: 'ling7378',
        directoryPermissions: parseInt(755, 8),
        showProgress: true
      }
    };

    grunt.config.set('sftp', sftp);
    grunt.task.run('sftp');
  });


  grunt.registerTask('stage-remove-files', 'removing files from stage', function() {
    var ssh = grunt.config.get('sshexec') || {};

    ssh['setup-stage'] =  {
        
        command: 'sudo rm -rf /var/www/src; sudo rm -rf /var/www/gruntDist; sudo find /var/www/public_html/ -mindepth 1 -maxdepth 1 -not -path "*/images*" -exec rm -rf {} \\;',
        //command: 'sudo find /var/www/public_html/ -mindepth 1 -maxdepth 1 -not -path "*/images*" ;',

        options: {
          host: '54.187.176.227',
          username: 'ec2-user',
          password: 'ling7378'
        }
      };

      grunt.config.set('sshexec', ssh);
      grunt.task.run('sshexec');
    });
  
  grunt.registerTask('stage-live', 'make stage live', function() {
  	var ssh = grunt.config.get('sshexec') || {};

  	ssh['setup-stage'] =  {
			  
			  //command: 'cd /var/www/ ; sudo rm -rf public_html; sudo rm -rf src; sudo rm -rf gruntDist; unzip gruntDist.zip; mv gruntDist/src src; sudo mv gruntDist/public_html public_html ; sudo rm -rf gruntDist; ls; ',
        //delete everything except public_html/images
        //command: 'cd /var/www/ ; sudo find /var/www/public_html/ -mindepth 1 -not -name images -exec rm -rf {} \\;',
        command: 'cd /var/www/ ; unzip /var/www/gruntDist.zip; mv /var/www/gruntDist/src /var/www/src; sudo rsync -a /var/www/gruntDist/public_html/ /var/www/public_html/; sudo rm -rf /var/www/gruntDist; ls;',

			  options: {
			  	host: '54.187.176.227',
			  	username: 'ec2-user',
			  	password: 'ling7378'
			  }
			};

			grunt.config.set('sshexec', ssh);
			grunt.task.run('sshexec');
		});

  grunt.registerTask('stage-live-assets', 'make stage assets live', function() {
    var ssh = grunt.config.get('sshexec') || {};

    ssh['setup-stage'] =  {
        //command: 'cd /var/www/ ; ls ; unzip gruntDist.zip; rm -rf public_html; rm -rf src; mv gruntDist/src src; mv gruntDist/public_html public_html; rm -rf gruntDist;',
        
        command: 'cd /var/www/ ; sudo rm -rf /var/www/public_html/images; sudo unzip images.zip; ',

        options: {
          host: '54.187.176.227',
          username: 'ec2-user',
          password: 'ling7378'
        }
      };

      grunt.config.set('sshexec', ssh);
      grunt.task.run('sshexec');
    });
  
  
  grunt.registerTask('stage-restart', 'stage httpd restart', function() {
  	var ssh = grunt.config.get('sshexec') || {};


  	ssh['restart'] =  {

  		command: 'sudo apachectl restart ; ',

  		options: {
  			host: '54.187.176.227',
  			username: 'ec2-user',
  			password: 'ling7378'
  		}
  	};
  	grunt.config.set('sshexec', ssh);
  	grunt.task.run('sshexec');
  });

  //production 

  grunt.registerTask('prod-deploy', '!!!!!!!!!Pushing zipped files to production', function() {
    var sftp = grunt.config.get('sftp') || {};
    sftp['push-zip'] = {
      files: {
        "./": "gruntDist.zip"
      },
      options: {
        path: '/var/www',
        host: '54.191.40.64',
        username: 'ec2-user',
        password: 'ling7378',
        directoryPermissions: parseInt(755, 8),
        showProgress: true
      }
    };

    grunt.config.set('sftp', sftp);
    grunt.task.run('sftp');
  });


  grunt.registerTask('prod-deploy-assets', '!!!!!!!!!Pushing zipped image files to production', function() {
    var sftp = grunt.config.get('sftp') || {};
    sftp['push-zip'] = {
      files: {
        "./": "images.zip"
      },
      options: {
        path: '/var/www',
        host: '54.191.40.64',
        username: 'ec2-user',
        password: 'ling7378',
        directoryPermissions: parseInt(755, 8),
        showProgress: true
      }
    };

    grunt.config.set('sftp', sftp);
    grunt.task.run('sftp');
  });


  grunt.registerTask('prod-remove-files', 'removing files from production', function() {
    var ssh = grunt.config.get('sshexec') || {};

    ssh['setup-stage'] =  {
        
        command: 'sudo rm -rf /var/www/src; sudo rm -rf /var/www/gruntDist; sudo find /var/www/public_html/ -mindepth 1 -maxdepth 1 -not -path "*/images*" -exec rm -rf {} \\;',
        
        options: {
          host: '54.191.40.64',
          username: 'ec2-user',
          password: 'ling7378'
        }
      };

      grunt.config.set('sshexec', ssh);
      grunt.task.run('sshexec');
    });
  
  grunt.registerTask('prod-live', '!!!!!!!!!make production live', function() {
    var ssh = grunt.config.get('sshexec') || {};

    ssh['setup-prod'] =  {
        
        command: 'cd /var/www/; unzip /var/www/gruntDist.zip; sudo mv /var/www/gruntDist/src /var/www/src; sudo rsync -a /var/www/gruntDist/public_html/ /var/www/public_html/; sudo rm -rf /var/www/gruntDist; ls;',
        
        options: {
          host: '54.191.40.64',
          username: 'ec2-user',
          password: 'ling7378'
        }
      };

      grunt.config.set('sshexec', ssh);
      grunt.task.run('sshexec');
    });

  grunt.registerTask('prod-live-assets', '!!!!!!!!!make production assets live', function() {
    var ssh = grunt.config.get('sshexec') || {};

    ssh['setup-stage'] =  {
        //command: 'cd /var/www/ ; ls ; unzip gruntDist.zip; rm -rf public_html; rm -rf src; mv gruntDist/src src; mv gruntDist/public_html public_html; rm -rf gruntDist;',
        
        command: 'cd /var/www/ ; sudo rm -rf /var/www/public_html/images; sudo unzip images.zip; ',

        options: {
          host: '54.191.40.64',
          username: 'ec2-user',
          password: 'ling7378'
        }
      };

      grunt.config.set('sshexec', ssh);
      grunt.task.run('sshexec');
    });
  
  
  grunt.registerTask('prod-restart', '!!!!!!!!!prod httpd restart', function() {
    var ssh = grunt.config.get('sshexec') || {};


    ssh['restart'] =  {

      command: 'sudo apachectl restart ; ',

      options: {
        host: '54.191.40.64',
        username: 'ec2-user',
        password: 'ling7378'
      }
    };
    grunt.config.set('sshexec', ssh);
    grunt.task.run('sshexec');
  });

};