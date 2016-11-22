/**
 * 
 */

var numberOfLectures = 0;
var numberOfTopics = 0;
var numberOfChapters = 0;
var numberOfFormattingContainers = 0;
var numberOfLinks = 0;

function getJsonTest(){
	
	var schoolmaterial = new Schoolmaterial();
	
	test_createLectureObject(schoolmaterial, 4);
	
	var chapter0 = new Chapter("Chapter 0");
	
	var chapter1 = new Chapter("Chapter 1");
	chapter0.content.push(chapter1);
	var chapter1_1 = new Chapter("Chapter 1.1");
	chapter1.content.push(chapter1_1);
	var chapter1_2 = new Chapter("Chapter 1.2");
	chapter1.content.push(chapter1_2);
	
	var chapter2 = new Chapter("Chapter 2");
	chapter0.content.push(chapter2);
	var chapter2_1 = new Chapter("Chapter 2.1");
	chapter2.content.push(chapter2_1);
	
	var chapter3 = new Chapter("Chapter 3");
	chapter0.content.push(chapter3);
	var formattingContainer0 = new FormattingContainer();
	chapter3.content.push(formattingContainer0);
	var formattingContainer1 = new FormattingContainer();
	chapter3.content.push(formattingContainer1);
	var formattingContainer2 = new FormattingContainer();
	chapter3.content.push(formattingContainer2);
	var link0 = new Link();
	formattingContainer2.content.push(link0);
	var formattingContainer2_1 = new FormattingContainer();
	link0.content.push(formattingContainer2_1);
	formattingContainer2_1.content.push("Formatting Container 2.1");
	var formattingContainer0 = new FormattingContainer();
	chapter3.content.push(formattingContainer0);
	
	var chapter4 = new Chapter("Chapter 4");
	chapter0.content.push(chapter4);
	var chapter4_1 = new Chapter("Chapter 4.1");
	chapter4.content.push(chapter4_1);
	var chapter4_2 = new Chapter("Chapter 4.2");
	chapter4.content.push(chapter4_2);
	
	return chapter0;
}

function test_createLectureObject(embeddingObject,number){
	
	for(var i = 0; i < number; i++){
		numberOfLectures++;
		embeddingObject.content.push(new Lecture(numberOfLectures));
	}
	return embeddingObject;
}

function test_createTopicObject(embeddingObject,number){
	
	for(var i = 0; i < number; i++){
		numberOfTopics++;
		embeddingObject.content.push(new Topic(numberOfTopics));
	}
	return embeddingObject;
}

function test_createChapterObject(embeddingObject,number){
	
	for(var i = 0; i < number; i++){
		numberOfChapters++;
		embeddingObject.content.push(new Chapter(numberOfTopics));
	}
	return embeddingObject;
}

function test_createFormattingContainerObject(embeddingObject,number){
	
	for(var i = 0; i < number; i++){
		numberOfFormattingContainers++;
		embeddingObject.content.push(new FormattingContainer(numberOfTopics));
	}
	return embeddingObject;
}

function test_createLinkObject(embeddingObject,number){
	
	for(var i = 0; i < number; i++){
		numberOfLinks++;
		embeddingObject.content.push(new Link(numberOfTopics));
	}
	return embeddingObject;
}