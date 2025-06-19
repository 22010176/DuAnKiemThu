using OpenQA.Selenium;

namespace UITests.Pages
{
  public class BangCapPage
  {
    private readonly IWebDriver _driver;
    private readonly string _url = "http://localhost:5173/bang-cap";

    public BangCapPage(IWebDriver driver)
    {
      _driver = driver;
    }

    public void GoTo()
    {
      _driver.Navigate().GoToUrl(_url);
    }

    public IWebElement AddButton => _driver.FindElement(By.CssSelector("button[aria-label='add-button']"));
    public IWebElement NameInput => _driver.FindElement(By.Name("tenBangCap"));
    public IWebElement AbbrevInput => _driver.FindElement(By.Name("tenVietTat"));
    public IWebElement SubmitButton => _driver.FindElement(By.CssSelector("button[type='submit']"));
    public IWebElement ReloadButton => _driver.FindElement(By.CssSelector("button[title='Tải lại']"));

    public void AddBangCap(string name, string abbrev)
    {
      AddButton.Click();
      NameInput.SendKeys(name);
      AbbrevInput.SendKeys(abbrev);
      SubmitButton.Click();
    }
  }
}
