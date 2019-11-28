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
        self.data.remove(Stack.size(self) - 1)

    def posh(self, data):
        self.data.append(data)

    def top(self):
        return self.data[Stack.size(self) - 1]
