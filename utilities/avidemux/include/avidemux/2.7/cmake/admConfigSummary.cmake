macro(INITIALISE_SUMMARY_LISTS)
	foreach(componentType ${SUMMARY_LIST})
		GET_SUMMARY_LIST_NAME(listName ${componentType})
		unset(${listName} CACHE)
	endforeach(componentType)

	set(SUMMARY_LIST "" CACHE INTERNAL "")
endmacro(INITIALISE_SUMMARY_LISTS)

macro(GET_SUMMARY_LIST_NAME outVariable componentType)
	string(REPLACE " " "_" safeComponentType "${componentType}")
	set(${outVariable} "SUMMARY_${safeComponentType}")
endmacro(GET_SUMMARY_LIST_NAME)

macro(APPEND_SUMMARY_LIST componentType componentName componentFound)
	GET_SUMMARY_LIST_NAME(listName ${componentType})

	if (${listName})
		set(${listName} ${${listName}} "${componentName}=${componentFound}" CACHE INTERNAL "")
	else (${listName})
		if (SUMMARY_LIST)
			set(SUMMARY_LIST ${componentType} ${SUMMARY_LIST} CACHE INTERNAL "")
		else (SUMMARY_LIST)
			set(SUMMARY_LIST ${componentType} CACHE INTERNAL "")
		endif (SUMMARY_LIST)

		set(${listName} "${componentName}=${componentFound}" CACHE INTERNAL "")
	endif (${listName})
endmacro(APPEND_SUMMARY_LIST)

function(padString outVariable length padCharacter value)
    string(LENGTH "${value}" valueLength)
    math(EXPR padLength "${length} - ${valueLength} - 1")
    set(paddedValue ${value})

    if (padLength GREATER -1)
        foreach(dummy RANGE ${padLength})
            set(paddedValue "${paddedValue}${padCharacter}")
        endforeach(dummy)
    endif (padLength GREATER -1)

    set(${outVariable} "${paddedValue}" PARENT_SCOPE)
endfunction(padString)

macro(COMPONENT_YESNO incoming componentName outgoing)
        set(tmp ${incoming})
        string(REGEX REPLACE "=.*$" "" tmp2 ${tmp} )
        string(COMPARE EQUAL ${tmp} ${tmp2} match)
        if(${match})
                set(${componentName} ${incoming})
                set(${outgoing}      "No")
        else(${match})
                set(${componentName} "${tmp2}")
                string(REGEX REPLACE "^.*=" "" tmp3 ${tmp})
                string(COMPARE EQUAL "${tmp3}" "1" match)
                string(COMPARE EQUAL "${tmp3}" "True" match2)
                if(${match} OR ${match2})
                        set(${outgoing}      "Yes")
                else(${match} OR ${match2})
                        set(${outgoing}      "No")
                endif(${match} OR ${match2})
        endif(${match})
endmacro(COMPONENT_YESNO incoming componentName outgoing)

macro(DISPLAY_SUMMARY_LIST)
	message("")
	message("**************************")
	message("***  Optional Library  ***")
	message("***      Summary       ***")
	message("**************************")

	foreach(componentType ${SUMMARY_LIST})
		GET_SUMMARY_LIST_NAME(listName ${componentType})

		padString(componentType 18 " " "${componentType}")
		message("*** ${componentType} ***")

		foreach(component ${${listName}})
                        COMPONENT_YESNO( ${component} componentName componentSummary) 
			padString(componentName 14 " " "${componentName}")
			message("    ${componentName} ${componentSummary}")
		endforeach(component)
	endforeach(componentType)

	message("**************************")

	if (CMAKE_BUILD_TYPE STREQUAL "Debug")
		message("***    Debug Build     ***")
	else (CMAKE_BUILD_TYPE STREQUAL "Debug")
		message("***   Release Build    ***")
	endif(CMAKE_BUILD_TYPE STREQUAL "Debug")

	message("**************************")
	message("")
endmacro(DISPLAY_SUMMARY_LIST)
