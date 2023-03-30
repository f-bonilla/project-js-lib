#!/bin/sh

######################################################################
#### Build component files in 'src' directory.  ######################
#### e.g.:                                      ######################
#### bash buildPackage.sh                       ######################
#### # user entry                               ######################
#### mainMenu.user.profile                      ######################
#### # directories and files created:           ######################
#### main-menu/user/profile                     ######################
#### 			profile.js                            ######################
#### 			profile-view.js                       ######################
#### 			profile.spec.js                       ######################
#### 			style.css                             ######################
#### 			template.html                         ######################
######################################################################

function exit_script {
	echo -e "\n----------------------------------------"
	#print all arguments
	echo $@
	echo -e "----------------------------------------\n"
	exit 1
}
function array_join_by {
  local d=${1-} f=${2-}
  if shift 2; then
    printf %s "$f" "${@/#/$d}"
  fi
}
function str_to_kebab-kase {
	echo $1 | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]'	
}
function spinal_to_upper {
    IFS=- read -ra str <<<"$1"
    printf '%s' "${str[@]^}"
}

echo "Type the path(camelCase) to the component separated by '.' and press [ENTER], ejem:
mainMenu.users.profile"
## get user package
read userPackage

## no user input, exit program
if [ -z "$userPackage" ]
then
  exit_script "You must enter a valid component name, e.g.: 'mainMenu.users.profile'."
fi

## goto "src" directory(create it if it does not exist)
appDirectory="src/"
if ! [ -d $appDirectory ]
then
	mkdir src
fi
cd $appDirectory

## remove interior spaces in userPackage
userPackage=${userPackage// /}
echo "userPackage -> "$userPackage

## package string split by "." into array 'folders'
IFS='.' read -r -a folders <<< "$userPackage"
## get last element(component name)
componentName="${folders[${#folders[@]}-1]}"
componentNameCamelCase=componentName
## component class name in PascalCase
componentName=${componentName^}
## file name in kebab-case
fileName=$(str_to_kebab-kase $componentName)
echo "componentName -> "$componentName
echo "fileName -> "$fileName

## save root path
foldersLength=${#folders[*]}
rootPath=""
for ((i=0; i<$foldersLength; i++)); do rootPath+="../"; done
echo "rootPath = "$rootPath

## all folders in kebab-case
count=0
for i in "${folders[@]}"
do
	folders[$count]=$(str_to_kebab-kase $i)
	count=$((count + 1))
done

## extracts from "userPackage" a series of values, class name, 
## directory and file names, css class names...
bemName=$(array_join_by '__' ${folders[*]})
# kebabCaseName=$(str_to_kebab-kase $userPackage)
# kebabCaseName=${kebabCaseName//[\.]/-}
pascalCaseName=$(spinal_to_upper $kebabCaseName)

packagePath=$(array_join_by '/' ${folders[*]})

echo "-------------------------------"
# echo "bemName -> "$bemName
# echo "kebabCaseName -> "$kebabCaseName
# echo "pascalCaseName -> "$pascalCaseName
echo "packagePath-> "$packagePath

## if the folder does not exist, the component is created
## if the folder exists but does not contain a component
##   the component is created
if [ -d $packagePath ]
then
	## folder exists
	if [ -f $packagePath/$fileName".js" ]
	then
		## the component has already been created
		exit_script "ERROR: The component '"$componentName"' already exists in the directory: "$packagePath
	fi
else
	## build folder
  mkdir -p $packagePath
fi

## goto folder
cd $packagePath

TAB='\t';
LINE_BREAK='\n';

## component template
file="template.html"
touch $file
str=""
str=$str"<div class=\"js-"$bemName\"">$componentName</div>"
echo -e $str >> $file

## component style
file="style.css"
touch $file
str=""
# the prefix "js" is for a convention "bem".
str=$str".js-"$bemName"{"$LINE_BREAK
str=$str"}"$LINE_BREAK
echo -e $str >> $file

## component
file=$fileName".js"
touch $file
str=""
str=$str"import FileManager from '"$rootPath"file-manager.js';"$LINE_BREAK
str=$str"import {getUniqueId} from '"$rootPath"utils.js';"$LINE_BREAK
str=$str"import "$componentName"View from './"$fileName"-view.js';"$LINE_BREAK$LINE_BREAK
str=$str"const "$componentName" = async (containerId, props)=>{"$LINE_BREAK
str=$str$TAB"const id = '"${componentName,,}"_' + getUniqueId();"$LINE_BREAK
str=$str$TAB"const cssPath = './"$appDirectory$packagePath"/style.css';"$LINE_BREAK
str=$str$TAB"const html = await FileManager.getHtml('./"$appDirectory$packagePath"/template.html');"$LINE_BREAK
str=$str$TAB"const view = "$componentName"View(id, containerId, cssPath, html, props);"$LINE_BREAK
str=$str$TAB"return {"$LINE_BREAK
str=$str$TAB$TAB"id: id,"$LINE_BREAK
str=$str$TAB$TAB"destroy: ()=>{"$LINE_BREAK
str=$str$TAB$TAB$TAB"view.destroy();"$LINE_BREAK
str=$str$TAB$TAB"}"$LINE_BREAK
str=$str$TAB"}"$LINE_BREAK
str=$str"};"$LINE_BREAK$LINE_BREAK
str=$str"export default "$componentName";"$LINE_BREAK
echo -e $str >> $file

## component view
file=$fileName"-view.js"
touch $file
str=""
str=$str"import {logger} from '"$rootPath"utils.js';"$LINE_BREAK
str=$str"import Views from '"$rootPath"views.js';"$LINE_BREAK
str=$str"import EventsManager from '"$rootPath"events-manager.js';"$LINE_BREAK$LINE_BREAK
str=$str"const "$componentName"View = (id, containerId, cssPath, html, props)=>{"$LINE_BREAK
str=$str$TAB"const view = Views(id, containerId, cssPath, html);"$LINE_BREAK
str=$str$TAB"const events = EventsManager(view);"$LINE_BREAK
str=$str$TAB"events.suscribe(view.get(), 'click', e=>logger.log('CLICK!'));"$LINE_BREAK
str=$str$TAB"return {"$LINE_BREAK
str=$str$TAB$TAB"enable: ()=>{},"$LINE_BREAK
str=$str$TAB$TAB"disable: ()=>{},"$LINE_BREAK
str=$str$TAB$TAB"destroy: ()=>{"$LINE_BREAK
str=$str$TAB$TAB$TAB"events.destroy();"$LINE_BREAK
str=$str$TAB$TAB$TAB"view.destroy();"$LINE_BREAK
str=$str$TAB$TAB"}"$LINE_BREAK
str=$str$TAB"};"$LINE_BREAK
str=$str"};"$LINE_BREAK$LINE_BREAK
str=$str"export default "$componentName"View;"$LINE_BREAK
echo -e $str >> $file

## test
file=$fileName".spec.js"
touch $file
str=""
str=$str"//import "$componentName" from './"$fileName".js';"$LINE_BREAK
str=$str"//import chai from 'chai';"$LINE_BREAK$LINE_BREAK
str=$str"//const assert = chai.assert;"$LINE_BREAK
str=$str"describe('check "$componentName"', function(){"$LINE_BREAK
str=$str"\tit('check {NAME} function', function(){"$LINE_BREAK
str=$str"\t\t// test code..."$LINE_BREAK
str=$str"\t});"$LINE_BREAK
str=$str"});"$LINE_BREAK
echo -e $str >> $file

exit_script "Component '"$componentName"' created."
