class Stack:
    def __init__(self):
        self.data = []

    def empty(self):
        if not self.data:
            return True
        else:
            return False

    def size(self):
        return len(self.data)

    def pop(self):
        if self.empty():
            print('Stack is empty!!!')
        else:
            return self.data.pop()

    def push(self, data):
        self.data.append(data)

    def top(self):
        return self.data[-1]

    # def __main__.Stack_class:


if __name__ == '__main__':
    a = Stack()
    a.push(1)
    a.push(2)

    print(a.pop())
    print(a.pop())