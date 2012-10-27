/**
 * A simple wrapper to extract TypeScript classes from modules for testing purpose.
 *
 * It only evaluate classes references but mark all the classes using it to be forward compatible with decisions taken
 * into how the module will be exported with TypeScript.
 *
 * @param classPath {String}
 * 		TypeScript classpath.
 */
function extract( classPath )
{
	var classRef = eval(classPath)
	return classRef;
}