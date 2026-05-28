# from playwright.async_api import async_playwright
# import random

# # Rotate these so sites don't see the exact same browser every time
# USER_AGENTS = [
#     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
#     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
# ]

# async def get_stealth_browser_content(url: str, wait_for_selector: str = None) -> str:
#     """
#     Opens a headless browser, bypasses basic bot detection, and returns the raw HTML.
#     """
#     async with async_playwright() as p:
#         browser = await p.chromium.launch(
#             headless=True,
#             args=["--disable-blink-features=AutomationControlled"] # Helps bypass bot detection
#         )
        
#         context = await browser.new_context(
#             user_agent=random.choice(USER_AGENTS),
#             viewport={'width': 1920, 'height': 1080}
#         )
        
#         page = await context.new_page()
        
#         # Adding a realistic timeout and wait state
#         await page.goto(url, wait_until="domcontentloaded", timeout=60000)
        
#         if wait_for_selector:
#             await page.wait_for_selector(wait_for_selector, timeout=15000)
            
#         html_content = await page.content()
#         await browser.close()
        
#         return html_content

from playwright.async_api import async_playwright
import random

# Rotate these so sites don't see the exact same browser every time
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
]

async def get_stealth_browser_content(url: str, wait_for_selector: str = None) -> str:
    """
    Opens a headless browser, bypasses basic bot detection, waits for SPA data to load, 
    and returns the raw HTML.
    """
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True,
                args=["--disable-blink-features=AutomationControlled"]
            )
            
            context = await browser.new_context(
                user_agent=random.choice(USER_AGENTS),
                viewport={'width': 1920, 'height': 1080}
            )
            
            page = await context.new_page()
            
            # 1. Wait just for the basic page frame to load, so it doesn't timeout
            await page.goto(url, wait_until="domcontentloaded", timeout=60000)

            # 2. Let our hard pause wait for Cleartrip's internal APIs to populate the flights
            await page.wait_for_timeout(8000) # Let's bump this to 8 seconds just to be safe on Cleartrip!
            
            # Take a photo of whatever is on the screen!
            await page.screenshot(path="debug_screenshot.png", full_page=True)
            
            # 3. If you pass a specific flight card class/ID, it will wait for that explicitly
            if wait_for_selector:
                await page.wait_for_selector(wait_for_selector, timeout=15000)
                
            html_content = await page.content()
            
            # 4. DEBUGGING: Save the HTML to a file so you can see what Gemini sees
            with open("debug_page.html", "w", encoding="utf-8") as f:
                f.write(html_content)
                
            await browser.close()
            
            return html_content
            
    except Exception as e:
        # Catch and print the exact error to the backend terminal
        print(f"\n--- SCRAPER CRASHED --- \nReason: {str(e)}\n-----------------------\n")
        raise e