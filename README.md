# spawn

<!-- VDOC.jsdoc spawn -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### var prom = spawn(command, [args], [opts])
- **command** (*String*) - A command name or a full command string
- **[args]** (*Array|Object*) - An array of arguments (or extra arguments) for the command OR the opts Object (see below)
- **[opts]** (*Object*) - Options to pass along to `process.spawn`, plus the following additional options
- **[opts.quiet]** (*Boolean*) - Suppresses logging of the actual command executed (logged by default). Default: false
- **[opts.getOutput]** (*Boolean*) - Promise will resolve with everything anything the command sent to stdout and stderr
- **[opts.verbose]** (*Boolean*) - Logs whatever the command sent to stdout and stderr
- **returns** (*Promise*) prom - Resolves when child process is completed

<!-- VDOC END -->