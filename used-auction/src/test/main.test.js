const main = jest.fn()

main()
test('함수는 두 번 호출 된다.', () => {
    console.log(main.mock.calls)
    expect(main.mock.calls.length).toBe(1) // calls.length === 호출된 횟수
  })