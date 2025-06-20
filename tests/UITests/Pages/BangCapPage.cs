// File: BangCapPage.cs

using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Threading;

namespace UITests.Pages
{
  public class BangCapPage
  {
    private readonly IWebDriver _driver;
    private readonly WebDriverWait _wait;

    public BangCapPage(IWebDriver driver)
    {
      _driver = driver;
      _wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(10));
    }

    public IWebElement AddButton => _wait.Until(d => d.FindElement(By.CssSelector("[data-testid='btn-them']")));
    public IWebElement TenBangCapInput => _wait.Until(d => d.FindElement(By.Name("tenBangCap")));
    public IWebElement TenVietTatInput => _wait.Until(d => d.FindElement(By.Name("tenVietTat")));
    public IWebElement SubmitButton => _wait.Until(d => d.FindElement(By.CssSelector("[data-testid='btn-submit']")));

    public void ClickAddButton() => AddButton.Click();

    public void EnterBangCap(string name, string abbrev)
    {
      TenBangCapInput.Clear();
      TenBangCapInput.SendKeys(name);
      TenVietTatInput.Clear();
      TenVietTatInput.SendKeys(abbrev);
    }

    public void SubmitForm() => SubmitButton.Click();

    public bool IsMessageDisplayed(string text)
    {
      try
      {
        _wait.Until(d => d.PageSource.Contains(text));
        return true;
      }
      catch
      {
        return false;
      }
    }

    public void ClickEditButton(string maBangCap)
    {
      var row = _wait.Until(d => d.FindElement(By.XPath($"//table//tr[td/div[contains(text(), '{maBangCap}')]]")));
      var editButton = row.FindElement(By.CssSelector("[data-testid='btn-sua']"));
      editButton.Click();
    }

    public void ClickDeleteButton(string maBangCap)
    {
      var row = _wait.Until(d => d.FindElement(By.XPath($"//table//tr[td/div[contains(text(), '{maBangCap}')]]")));
      var deleteButton = row.FindElement(By.CssSelector("[data-testid='btn-xoa']"));
      deleteButton.Click();
    }

    public void ConfirmDelete()
    {
      var okButton = _wait.Until(d =>
      {
        try
        {
          var btn = d.FindElement(By.CssSelector(".ant-btn-primary"));
          return (btn.Displayed && btn.Enabled) ? btn : null;
        }
        catch
        {
          return null;
        }
      });

      okButton.Click();
    }


    public void WaitUntilRowExists(string maBangCap)
    {
      _wait.Until(d =>
      {
        try
        {
          var row = d.FindElement(By.XPath($"//table//tr[td/div[contains(text(), '{maBangCap}')]]"));
          return row.Displayed;
        }
        catch (NoSuchElementException)
        {
          return false;
        }
      });
    }


  }
}
