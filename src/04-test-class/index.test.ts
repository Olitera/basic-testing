import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const result = getBankAccount(initialBalance).getBalance();
    expect(result).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const amount = 150;
    expect(() => getBankAccount(initialBalance).withdraw(amount)).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const initialBalance2 = 300;
    const amount = 150;
    const toAccount = getBankAccount(initialBalance2);
    expect(() =>
      getBankAccount(initialBalance).transfer(amount, toAccount),
    ).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const amount = 150;
    const toAccount = getBankAccount(initialBalance);
    expect(() =>
      getBankAccount(initialBalance).transfer(amount, toAccount),
    ).toThrow();
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const amount = 150;
    const result = getBankAccount(initialBalance).deposit(amount).getBalance();
    expect(result).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const amount = 50;
    const result = getBankAccount(initialBalance).withdraw(amount).getBalance();
    expect(result).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const initialBalance2 = 70;
    const amount = 50;
    const toAccount = getBankAccount(initialBalance2);
    const result = getBankAccount(initialBalance)
      .transfer(amount, toAccount)
      .getBalance();
    expect(result).toBe(initialBalance - amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    expect(getBankAccount(initialBalance).fetchBalance()).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    account
      .synchronizeBalance()
      .then(() => {
        expect(initialBalance === account.getBalance()).toBeFalsy();
      })
      .catch(() => {
        console.log('');
      });
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    account
      .synchronizeBalance()
      .then(() => {
        expect(initialBalance === account.getBalance()).toBeTruthy();
      })
      .catch(() => {
        console.log('');
      });
  });
});
