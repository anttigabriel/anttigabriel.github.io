# Nine hours on one exercise

October 29, 2026

On Tuesday I spent five 'pure' hours working on an exercise in a course I'm taking about data structures and algorithms. By pure I mean that when I went away from computer to take a pause, the time wasn't being tracked; only the pure working time was tracked.

It took the whole day until almost nine pm to get those five hours, considering all the breaks I had.
That whole time I worked on one exercise. And I didn't finish it. The task is to come up with an algorithm that takes as parameters integer arrays A and B, and then returns the values that are only in A.

Yesterday's approach was too time-consuming. It's as if I'm trying to come up with the solution wholly by myself, not using  AI to complete the exercise.
However, I think that that kind of approach isn't sustainable for me right now because I have to get these exercises done today (Wednesday).

I told my friend about my struggle. It feels like I'm feeling resentment towards using AI because I don't want it to give any ready-made answers; I want to learn. However, not using it at all leads me to spend way too much time on one exercise. The solution might be to find a middle ground in using it: Making it to tell me more about useful approaches to solve the exercise, but still keeping a strict boundary with it not telling me the answer.

Today I'm going to try be more efficient, today I'm going work on my exercise(s) again.

**Four working hours later**

Today I spent four pure hours on the same exercise, and it is not done yet. It's almost done, but I'm feeling resentment towards doing some tweaks to make it correct.

At this point I'm going to leave it here and call it a day.

**Thursday**

Today I woke up and went through what I had written. I made the needed tweaks for the algorithm plan to be more or less correct! And then I cycled to the campus for an exercise session. I cycled fast because I was running late. I came on time.

For this week there were 6 exercises to be done in total. I did three. The two first ones I had done a while ago. The third exercise was the one I spent over nine hours with. I failed to do fourth, fifth, and a so called X1 task. X1 tasks was the most important one of all, because it affects the whole course grade and I get minus points from the total grade for not doing it.

It happened to be that my name was called to present the third exercise. The one I spent nine hours doing. When it was my time to perform my voice was shaking a bit but it went well. 

I pat myself on my shoulder for showing up this morning to complete the exercise, and for presenting it. For the next week's exercise session, I really want to complete more exercises, especially the X-exercise. To increase to possibility of achieving that, I want to start watching the lecture recordings and doing the exercises earlier, start this week. Perhaps I could also attend on-campus guidance sessions.

### The exercise solution

As mentioned earlier, the task was to write an algorithm where there two integer arrays received as parameters, called A and B. The task was to return the elements that were found in A but not in B in an integer array.

I ended up using a following recipe to complete the task:

1. The first step is to create a HashSet and put the elements of array B into it. HashSet allows us to access elements with O(1) time complexity.  

2. The second step is to create an ArrayList, where we append the returnable elements one by one.  

3. The third step is that we start iterating through array A. At every step of inspecting the elements, we check whether the element being inspected in A can be found from HashSet that contains all the B's values. If the HashSet does NOT contain the element, it means it can only be found from A. We find out it to be the exactly the kind of value we're looking for. We therefore append it to the ArrayList.

We collect the needed values to ArrayList because in ArrayList we can just append stuff into it with a good time complexity, O(1) if I'm not wrong. Adding them to an array would be not as handy because arrays are a fixed size, meaning that we'd have to kind of re-create the array each time an element is added into it, and it'd have to find a new location from the memory each time. However, we have to return the result in array, according to the exercise's instructions, so we convert the ArrayList to array at the end.

4. After going iterating through the whole array A, and having appended all the elements that were only unique for A into the ArrayList, we arrive at the fourth i.e. the final step and convert the ArrayList into an array and return it.

The time complexity of this algorithm is to be calculated followingly:

n is the length of A
m is the length of B

Iterating through B's values and putting them into a HashSet takes O(m) time. I started to wonder why isn't it O(1) time, because that's how much it takes to access and element from an array. But it seems to be because I have to access each element from the array anyway. Accessing a particular element using index would be O(1), but here I am not accessing only one, but all of the elements, therefore I go through the whole thing, which is m, so it takes me O(m) time.

Creating the ArrayList takes O(1) time so we don't take into consideration here.

Iterating through A and deciding whether to add a value to the HashSet takes O(n) time because we iterate through the whole A.

Turning the ArrayList into an array takes O(n) time. It's because Java has to copy each element one by one from the ArrayList into the final array, if I'm not wrong.

So we have O(m) + O(n) + O(n). The last two time complexities, O(n) + O(n), can be written as 2O(n). And in Big-O notation we ignore the constant multipliers. Which means that even if we process n elements twice, the time complexity still grows linearly with n, so it's therefore simplified into one O(n). Finally, we have O(m+n) as our time complexity.
