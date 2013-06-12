var Question = function(name_, text_, type_)
{
	var name = name_;
	var text = text_;
	var type = type_;
	
	var options = [];
	var countOptions = 0;

	var answers = [];
	var countAnswers = 0;
	
	this.Name = name;
	this.Text = text;
	
	this.GetAnswer = function(index)
	{
		return answers[index];
	}
	
	this.SaveAnswer = function()
	{
		if(type === 'one' || type === 'many')
		{
			var i = 0;
			countAnswers = 0;
			
			$('input').each(function()
			{
				if($(this).is(':checked'))
				{
					answers[countAnswers] = i;
					countAnswers++;
				}
				i++;
			});
		}
		
		if(type === 'word')
		{
			var answ = $('input').first().val();
			countAnswers = 0;
			
			if(answ !== '')
			{
				answers[0] = answ;
				countAnswers = 1;
			}
		}
		
		if(type === 'comparison')
		{
			countAnswers = 0;
			$('select').each(function(){
				answers[countAnswers] = $(this).prop('selectedIndex');
				countAnswers++;
			});
		}
	}
	
	this.AddOption = function(item)
	{
		options[countOptions] = item;
		countOptions++;
	}
	
	this.CountOptions = function()
	{
		return countOptions;
	}
	
	this.CountAnswers = function()
	{
		return countAnswers;
	}
	
	this.GetAnswer = function(index)
	{
		return answers[index];
	}
	
	this.PrintOptions = function(item)
	{
		switch(type)
		{
			case 'one':
			{
				item.append('<div class="hint">Выберите единственный правильный ответ.</div>');
				
				for(var i = 0; i < countOptions; i++)
				{
					item.append('<input type="radio" name="option1">' + options[i] + '<br>');
				}
				
				for(var i = 0; i < countAnswers; i++)
				{
					$('input').get(answers[i]).click();
				}
				
				break;
			}
			case 'many':
			{
				item.append('<div class="hint">Выберите несколько правильных ответов.</div>');
				
				for(var i = 0; i < countOptions; i++)
				{
					item.append('<input type="checkbox" name="option1">' + options[i] + '<br>');
				}
				
				for(var i = 0; i < countAnswers; i++)
				{
					$('input').get(answers[i]).click();
				}
				
				break;
			}
			case 'word':
			{
				item.append('<div class="hint">Введите правильный ответ.</div>');
				
				var value = '';
				
				if(countAnswers === 1)
				{
					value = answers[0];
				}
				
				item.append('<input type="edit" name="option1" value="' + value + '"><br>');
				
				break;
			}
			case 'comparison':
			{
				item.append('<div class="hint" >Сопоставьте предложенные варианты.</div>');
								
				for(var i = 0; i < countOptions/2; i++)
				{
					item.append((i + 1) + ') ' + options[i] + ' - ');
					
					item.append('<select>');
					
					for(var j = countOptions/2; j < countOptions; j++)
					{
						$('select').last().append('<option>' + options[j] + '</option>');
					}
					
					item.append('</select><br>');
				}
				
				var i = 0;
				
				if(countAnswers > 0)
				{
					$('select').each(function(){
						$(this).prop('selectedIndex', answers[i]);
						i++;
					});
				}
				break;
			}
		}
	}
}

var Test = function(name_)
{
	var name = name_;
	var questions = [];
	var counter = 0;
	
	this.Name = name;
	
	this.AddQuestion = function(question)
	{
		questions[counter] = question;
		counter++;
	}
	this.IndexOf = function(index)
	{
		return questions[index];
	}
	this.Counter = function()
	{
		return counter;
	}
}

var CurrentTest;

$(document).ready(function(){

	$('body').append('<span></span>');
	
	$('span').append('Выберите тест:');

	$.ajax({
        type: "GET",
        url: "list.php",
        dataType: "html",
        success: function(data)
		{
		
			$('span').append(data);
			$('span').append('<br><div class="button unselectable" id="choose"><a href=""><span>Выбрать</span></a></div>');
			$('#choose').bind('click', function(event){
				event.preventDefault();
				
				var test_id = $('select').prop('selectedIndex') + 1;
				
				$('span').remove();

				$.ajax({
					type: "GET",
					url: "test.php",
					data: { id: test_id },
					dataType: "xml",
					success: xmlParser
				});
			});
		}
    });
});

function xmlParser(xml)
{

	$('.questions').append('<span class="unselectable">' + $(xml).find("title").text() + '</span>');
	$('.questions').append('<ul>');
	
	CurrentTest = new Test($(xml).find("title").text());
	
	// добавляем вопросы
		
	$(xml).find("question").each(function (){
	
		$('ul').append('<li><a href=""><span class="unselectable">' + $(this).find("name").text() + "</span></a></li>");
		
		var question = new Question($(this).find("name").text(), $(this).find("text").text(), $(this).find("type").text());
		
		$(this).find('option').each(function(){
			question.AddOption($(this).text());
		});
		
		CurrentTest.AddQuestion(question);
    });
	
	var index = 0;
	
	$('li').each(function(){
		$(this).attr("id", index);
		index++;
	});
	
	$('.questions').append('</ul>');
	
	$('.questions').after('<div class="output"><span></span></div>');
	
	clickMenu($('#0'));
	
	$('.output').append('<div class="button navigate unselectable" id="prev"><a href=""><span>Предыдуший</span></a></div>');
	$('.output').append('<div class="button navigate unselectable" id="next"><a href=""><span>Следующий</span></a></div>');
	
	$('.output').append('<div class="button end unselectable" id="finish"><a href=""><span>Закончить тестирование</span></a></div>');
		
	bindEvents();
}

function clickMenu(item)
{
	var prevQst = $('.selected').attr('id');
	
	if(prevQst !== undefined)
	{
		var currentQuestion = CurrentTest.IndexOf($('.selected').attr('id'));
		
		currentQuestion.SaveAnswer();
	}

	$('li').removeClass('selected');
	$(item).toggleClass('selected');
		
	$('.output').hide();
		
	$('.output > span').html(CurrentTest.IndexOf(item.attr('id')).Name + '.<br>' + CurrentTest.IndexOf(item.attr('id')).Text + '<hr>');
	
	CurrentTest.IndexOf(item.attr('id')).PrintOptions($('.output > span'));
		
	$('.output').fadeIn('fast');
}

function bindEvents()
{

	$('li').bind('click', function(event){
		event.preventDefault();
		
		if($(this).attr('class') !== 'selected')
		{
			clickMenu($(this));
		}
	});
	
	$('#prev').bind('click', function(event){
		event.preventDefault();
		
		var current = $('.selected');
		
		if(current.attr('id') === $('li').first().attr('id'))
		{
			clickMenu($('li').last());
		}
		else
		{
			clickMenu(current.prev());
		}
	});
	
	$('#next').bind('click', function(event){
		event.preventDefault();
		
		var current = $('.selected');
		
		if(current.attr('id') === $('li').last().attr('id'))
		{
			clickMenu($('li').first());
		}
		else
		{
			clickMenu(current.next());
		}
	});

	$('#finish').bind('click', function(event){
		event.preventDefault();
		
		var prevQst = $('.selected').attr('id');
	
		if(prevQst !== undefined)
		{
			var currentQuestion = CurrentTest.IndexOf($('.selected').attr('id'));
			
			currentQuestion.SaveAnswer();
		}
		
		var Points = function(max_)
		{
			var max = max_;
			var count = 0;
			var result = 0;
			
			this.Add = function(value)
			{
				count++;
				if(value > 0)
					result += value;
			}
			
			this.Finished = function()
			{
				return count === max;
			}
			
			this.Result = function()
			{
				return result;
			}
		}
		
		var questions = [];
		var answers = [];
		
		for(var i = 0; i < CurrentTest.Counter(); i++)
		{
			var q = CurrentTest.IndexOf(i);
			
			var result = '';
			
			for(var j = 0; j < q.CountAnswers(); j++)
			{
				result += q.GetAnswer(j);
				
				if(j != q.CountAnswers()-1)
					result += ',';
			}
			
			questions[i] = q.Name;
			
			if(q.CountAnswers() > 0)
			{
				answers[i] = result;
			}
			else
			{
				answers[i] = '';
			}
		}
		
		$.ajax({
			type: "POST",
			url: "check.php",
			data: { qst : questions, ans : answers },
			success: function(data)
			{
				alert('Вы прошли тест. Ваш результат: ' + data);
				window.location.reload();
			}
		});
	});
}